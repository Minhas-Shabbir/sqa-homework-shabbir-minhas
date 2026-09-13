import os
import requests

from deepeval.models.base_model import DeepEvalBaseLLM

GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


class GeminiJudge(DeepEvalBaseLLM):
    def __init__(self, model_name: str = "gemini-3.5-flash"):
        self.model_name = model_name
        self.api_key = os.environ["GOOGLE_API_KEY"]

    def load_model(self):
        return self

    def generate(self, prompt: str) -> str:
        url = GEMINI_ENDPOINT.format(model=self.model_name)
        response = requests.post(
            url,
            headers={"x-goog-api-key": self.api_key, "Content-Type": "application/json"},
            json={"contents": [{"parts": [{"text": prompt}]}]},
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]

    async def a_generate(self, prompt: str) -> str:
        return self.generate(prompt)

    def get_model_name(self):
        return self.model_name
