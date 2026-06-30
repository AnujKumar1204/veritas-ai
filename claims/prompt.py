claim_prompt = """
You are a professional fact-checking assistant.

Extract only factual claims from the text.

Rules:
1. Ignore opinions.
2. Ignore questions.
3. Ignore greetings.
4. Extract only verifiable factual statements.

Text:{text}
"""