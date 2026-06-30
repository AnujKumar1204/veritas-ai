import re
import spacy
import wikipedia as wiki_search

nlp = spacy.load("en_core_web_sm")


class wikipedia:
    def __init__(self):
        wiki_search.set_lang("en")

    def page_retrieve(self, title: str) -> str:
        try:
            page = wiki_search.page(title, auto_suggest=False)
            
            sentences = re.split(r'(?<=[.!?])\s+', page.content)
            return ' '.join(sentences[:20])
        except wiki_search.DisambiguationError as e:
            try:
                page = wiki_search.page(e.options[0], auto_suggest=False)
                sentences = re.split(r'(?<=[.!?])\s+', page.content)
                return ' '.join(sentences[:5])
            except Exception:
                return ""
        except Exception:
            return ""

    def extract_keywords(self, query: str) -> list:
        doc = nlp(query)
        candidates = []

        for ent in doc.ents:
            candidates.append(ent.text)

        for chunk in doc.noun_chunks:
            clean = " ".join(
                token.text for token in chunk
                if not token.is_stop and not token.is_punct
            )
            if clean and len(clean.split()) > 1:
                candidates.append(clean)

        for token in doc:
            if token.pos_ == "PROPN" and not token.is_stop:
                candidates.append(token.text)

        return list(dict.fromkeys(c for c in candidates if len(c) > 2))

    def search_and_retrieve(self, query: str) -> str:
        
        try:
            results = wiki_search.search(query, results=5)
            for title in results:
                query_words = set(query.lower().split())
                title_words = set(title.lower().split())
                if query_words & title_words:
                    text = self.page_retrieve(title)
                    if text and len(text) > 100:
                        return text
        except Exception:
            pass

        keywords = sorted(self.extract_keywords(query), key=len, reverse=True)

        for keyword in keywords:
            try:
                search_results = wiki_search.search(keyword, results=5)
                for title in search_results:
                    keyword_words = set(keyword.lower().split())
                    title_words = set(title.lower().split())
                    if keyword_words & title_words:
                        text = self.page_retrieve(title)
                        if text and len(text) > 100:
                            return text
            except Exception:
                continue

        try:
            results = wiki_search.search(query, results=3)
            if results:
                return self.page_retrieve(results[0])
        except Exception:
            pass

        return ""