import json
import os

from deepeval import assert_test
from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCase, LLMTestCaseParams

from deepeval_gemini_judge import GeminiJudge


def load_captured_response():
    path = os.path.join(os.path.dirname(__file__), "last-response.json")
    with open(path) as f:
        data = json.load(f)
    return data["question"], data["responseText"]


def test_what_is_permission_response_is_coherent():
    question, response_text = load_captured_response()

    test_case = LLMTestCase(
        input=question,
        actual_output=response_text,
    )

    coherence_metric = GEval(
        name="ExplainsPermissionClearly",
        criteria=(
            "Does the response explain that Permission is a platform/agent "
            "related to personal data, giving users control over their data "
            "and letting them earn rewards for sharing it, in language a new "
            "user could understand? It should NOT be empty, evasive, an "
            "error message, or nonsensical filler text."
        ),
        evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT],
        model=GeminiJudge(),
        threshold=0.7,
    )

    assert_test(test_case, [coherence_metric])
