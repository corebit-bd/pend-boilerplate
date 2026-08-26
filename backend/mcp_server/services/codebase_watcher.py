import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from .gemini_agent_runner import GeminiAgentRunner

class LocalCodeHandler(FileSystemEventHandler):
    def __init__(self):
        self.runner = GeminiAgentRunner()

    def on_created(self, event):
        if event.is_directory or not event.src_path.endswith((".tsx", ".py")):
            return
        if ".test." in event.src_path or ".stories." in event.src_path:
            return

        print(f"[IDD EVENT] New file detected: {event.src_path}")
        self.runner.process_new_file(event.src_path)

def start_daemon():
    observer = Observer()
    observer.schedule(LocalCodeHandler(), path="frontend/src", recursive=True)
    observer.schedule(LocalCodeHandler(), path="backend/apps", recursive=True)
    observer.start()
    print("[DAEMON ONLINE] CodebaseWatcherAgent listening for file changes...")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    start_daemon()