import os
import json
import requests

scholar_id = os.environ["GOOGLE_SCHOLAR_ID"]
api_key = os.environ["SERPAPI_API_KEY"]

url = "https://serpapi.com/search.json"

params = {
    "engine": "google_scholar_author",
    "author_id": scholar_id,
    "api_key": api_key,
    "hl": "en"
}

data = requests.get(url, params=params, timeout=30).json()

citations = data["cited_by"]["table"][0]["citations"]["all"]

print(f"Total citations: {citations}")

os.makedirs("results", exist_ok=True)

shield_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": str(citations)
}

with open(
    "results/gs_data_shieldsio.json",
    "w",
    encoding="utf-8"
) as f:
    json.dump(shield_data, f, ensure_ascii=False, indent=2)
