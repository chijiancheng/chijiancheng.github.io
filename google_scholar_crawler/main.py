import os
import json
import sys
import requests

SCHOLAR_ID = os.environ["GOOGLE_SCHOLAR_ID"]
SERPAPI_KEY = os.environ["SERPAPI_API_KEY"]

url = "https://serpapi.com/search.json"

params = {
    "engine": "google_scholar_author",
    "author_id": SCHOLAR_ID,
    "api_key": SERPAPI_KEY,
    "hl": "en"
}

try:
    response = requests.get(url, params=params, timeout=30)
    response.raise_for_status()
    data = response.json()

    if "error" in data:
        raise RuntimeError(data["error"])

    if "cited_by" not in data:
        raise RuntimeError(
            "SerpAPI returned successfully but citation data was not found."
        )

    citations = data["cited_by"]["table"][0]["citations"]["all"]

except Exception as e:
    print(f"Failed to update Google Scholar citations: {e}")
    sys.exit(1)

print(f"Google Scholar citations: {citations}")

os.makedirs("results", exist_ok=True)

shield_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": str(citations)
}

output = "results/gs_data_shieldsio.json"

with open(output, "w", encoding="utf-8") as f:
    json.dump(
        shield_data,
        f,
        ensure_ascii=False,
        indent=2
    )

print(f"Successfully generated {output}")
