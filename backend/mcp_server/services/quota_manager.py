"""Model Quota Manager Service.

Tracks local Request Counts, Token Consumption and Rate Limits across Models
to determine when Fallback Switches should trigger.
"""

import threading
from datetime import datetime, timedelta
from typing import Any, Dict


class ModelQuotaManager:
    """Thread-safe Manager Monitoring Model Usage and Rate Limits."""

    def __init__(self, requests_per_minute_limit: int = 60):
        """Initializes Quota Trackers and Lock Mechanism."""
        self.rpm_limit = requests_per_minute_limit
        self.request_timestamps = []
        self.total_tokens_used = 0
        self.fallback_active = False
        self._lock = threading.Lock()

    def record_usage(self, prompt_tokens: int = 0, completion_tokens: int = 0):
        """Records API Request Timestamp and Token Consumption.

        Args:
            prompt_tokens: Estimated or Reported Prompt Token Count.
            completion_tokens: Estimated or Reported Output Token Count.
        """
        with self._lock:
            now = datetime.now()
            self.request_timestamps.append(now)
            self.total_tokens_used += prompt_tokens + completion_tokens
            self._cleanup_old_timestamps(now)

    def _cleanup_old_timestamps(self, current_time: datetime):
        """Removes Request Timestamps older than 60 seconds.

        Args:
            current_time: Active datetime Instance for comparison.
        """
        cutoff = current_time - timedelta(seconds=60)
        self.request_timestamps = [ts for ts in self.request_timestamps if ts > cutoff]

    def is_rate_limited(self) -> bool:
        """Checks if Request Volume in the last Minute exceeds RPM Limit.

        Returns:
            Boolean indicating if Rate Limit is reached.
        """
        with self._lock:
            now = datetime.now()
            self._cleanup_old_timestamps(now)
            return len(self.request_timestamps) >= self.rpm_limit

    def set_fallback_state(self, active: bool):
        """Manually toggles Active Fallback State.

        Args:
            active: Boolean setting Fallback Mode on or off.
        """
        with self._lock:
            self.fallback_active = active

    def get_status(self) -> Dict[str, Any]:
        """Returns current Quota and Rate Limit Status Metrics.

        Returns:
            Dictionary detailing Active RPM, Token Totals and Fallback State.
        """
        with self._lock:
            now = datetime.now()
            self._cleanup_old_timestamps(now)
            return {
                "rpm_limit": self.rpm_limit,
                "current_rpm": len(self.request_timestamps),
                "total_tokens_consumed": self.total_tokens_used,
                "rate_limited": len(self.request_timestamps) >= self.rpm_limit,
                "fallback_active": self.fallback_active,
            }
