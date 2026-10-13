# Use Python Version from Build Args (For docker-compose Compatibility)
ARG PYTHON_VERSION=3.13
FROM python:${PYTHON_VERSION}-slim

# Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set Work Directory
WORKDIR /app

# Install System Dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python Dependencies
COPY requirements.txt requirements-dev.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy Project Files
COPY . .

# Create Necessary Directories
RUN mkdir -p staticfiles media

# Expose Port
EXPOSE 8000

# Default Command (Can be Overridden by Docker Compose)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--timeout", "60", "core.wsgi:application"]