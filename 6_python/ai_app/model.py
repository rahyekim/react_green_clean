#인공지능 모델관리 및 추론
# pip install transformers torch accelerate
import torch  #딥러닝 연산 핵심도구
from transformers import AutoModelForCausalLM, AutoTokenizer


class AIModelManager:
    def __init__(self):
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.llm_model = None
        self.tokenizer = None

    def load_llm(self):
        model_id = "microsoft/phi-4"
        print(f"Loading LLM model on {self.device}...")
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)
        self.llm_model = AutoModelForCausalLM.from_pretrained(
            model_id,
            torch_dtype=torch.float16 if self.device == 'cuda' else torch.float32,
            device_map="auto",
        )
    def predict_llm(self, prompt:str, max_new_tokens: int=128):
        if not self.llm_model:
            return "LLM model is not loaded."

        # 프롬프트를 토큰화하고 모델이 있는 장치(device)로 이동
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)
        #  모델을 이용해 텍스트 생성
        outputs = self.llm_model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=0.7,
            do_sample=True,
        )
        # 생성된 토큰들을 사람이 읽을 수 있는 텍스트로 디코딩
        result = self.tokenizer.decode(outputs[0])
        return result

ai_manager = AIModelManager()



