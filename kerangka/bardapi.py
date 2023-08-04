# from gtts import gTTS
# import pyttsx3
# import speech_recognition as sr 
# import os
# from playsound import playsound
# from bardapi import Bard

# def main():
#     os.environ["_BARD_API_KEY"] = "ZQjdFljLGNvwvYhDyiD7-WzqYLrjATqSH02RJO-XFqPhf3-o3pBzlnvMtdHe75d1S7Gf5w."  # Ganti dengan URL API yang sesuai
#     text = "apa itu mobil"
#     print(f"You Said : {text}")
#     response = Bard().get_answer(text)['content']
#     # if len(response) > 100:
#     #     sentences = response.split(".")
#     #     response = " ".join(sentences[:5]) + "..."
#     print(f"GPT Says : {response}")
        
# if __name__ == "__main__":
#     main()

import requests
import os
from bardapi import Bard

def main():
    data = []
    os.environ["_BARD_API_KEY"] = "ZQjdFljLGNvwvYhDyiD7-WzqYLrjATqSH02RJO-XFqPhf3-o3pBzlnvMtdHe75d1S7Gf5w."  # Ganti dengan URL API yang sesuai
    text = "apa itu mobil"
    # print(f"You Said : {text}")
    response = Bard().get_answer(text)['content']
    # print(f"GPT Says : {response}")
    try:
        # if response.status_code == 200:  # Kode status 200 berarti permintaan berhasil
            # data_text = response.text
            data.append(response)  # Mendapatkan data dari respons dalam format JSON
            return data
        # else:
        #     return None

    except requests.exceptions.RequestException as e:
        return None