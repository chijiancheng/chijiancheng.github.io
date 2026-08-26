import os
import json
import requests

scholar_id = os.environ["GOOGLE_SCHOLAR_ID"]
api_key = os.environ["SERPAPI_API_KEY"]

params = {
    "engine": "google_scholar_author",
    "author_id": scholar_id,
    "api_key": api_key,
    "hl": "en"
}

response = requests.get(
    "https://serpapi.com/search.json",
    params=params,
    timeout=30
)

response.raise_for_status()
data = response.json()

# 如果 SerpAPI 返回错误，直接把错误打印出来
if "error" in data:
    raise RuntimeError(f"SerpAPI error: {data['error']}")

# 如果没有 cited_by，打印完整响应，方便定位
if "cited_by" not in data:
    print(json.dumps(data, indent=2, ensure_ascii=False))
    raise RuntimeError("SerpAPI response does not contain cited_by")

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
