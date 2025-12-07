FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim

WORKDIR /app

# Copy dependency files first (better caching)
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

# Copy the rest of the code
COPY . .

# Run the app
CMD ["uv", "run", "gunicorn", "--bind", ":8080", "--workers", "1", "--threads", "8", "--timeout", "0", "app:app"]