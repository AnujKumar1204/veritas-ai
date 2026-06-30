# Pydantic is a Python library that:
# validates data,
# checks data types,
# converts compatible values automatically,
# raises errors for invalid data.

from pydantic import BaseModel
from typing import List

class ClaimList(BaseModel):
    claims: List[str]
    