FROM mcr.microsoft.com/playwright/python:v1.41.0-jammy

# Set environment variables for memory optimization
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

WORKDIR /app

# Install only Chromium browser (lighter than all browsers)
RUN playwright install chromium && \
    playwright install-deps chromium && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set Playwright environment variables for low memory usage
ENV PLAYWRIGHT_CHROMIUM_ARGS="--disable-dev-shm-usage --no-sandbox --disable-setuid-sandbox --disable-gpu --disable-software-rasterizer --disable-extensions --disable-background-networking --disable-default-apps --disable-sync --metrics-recording-only --mute-audio --no-first-run --disable-crash-reporter"

# Run with optimized uvicorn settings for low memory
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000", "--workers", "1", "--limit-concurrency", "10", "--timeout-keep-alive", "30"]