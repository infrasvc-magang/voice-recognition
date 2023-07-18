from gtts import gTTS
import pyttsx3
import speech_recognition as sr 
import os
from playsound import playsound
from bardapi import Bard

# set your OpenAI API key
os.environ["_BARD_API_KEY"] = "YAjdFixD9kH7FAwf11isWUPoGpPIboBB8xpkyf7PfahPGX0UPFcwcqRYnyB-crIBLmDy4w."

# Initialize the text-to-speech engine
engine = pyttsx3.init()

def transcribe_audio_to_text(filename):
    recognizer = sr.Recognizer()
    with sr.AudioFile(filename) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio, language='id-ID')
    except:
        print('The system does not accept voice input')




def speak_text(text):
    engine.setProperty('voice', 'id')
    engine.say(text)
    engine.runAndWait()


def main():
    oke_sound_played = False  # Variable to track if "oke" sound has been played

    while True:
        # Wait for "Siri" command
        print("Say 'Siri' to start recording your questions...")
        with sr.Microphone() as source:
            recognizer = sr.Recognizer()
            audio = recognizer.listen(source)
            try:
                transcription = recognizer.recognize_google(audio)
                if transcription.lower() == "siri":
                    # Record audio
                    filename = "mic.wav"
                    print("Say your questions...")
                    if not oke_sound_played:
                            # Play "oke" sound
                            text_oke = "Oke, Tanyakan Sesuatu"
                            tts = gTTS(text=text_oke, lang="id")
                            tts.save("ask.mp3")
                            playsound("ask.mp3")
                            os.remove('ask.mp3')
                            oke_sound_played = True

                    oke_sound_played = False
                    with sr.Microphone() as source:
                        recognizer = sr.Recognizer()
                        source.pause_threshold = 1
                        audio = recognizer.listen(source, phrase_time_limit=None, timeout=None)
                        with open(filename, "wb") as f:
                            f.write(audio.get_wav_data())

                    # Transcribe audio to text
                    text = transcribe_audio_to_text(filename)
                    if text:
                            print(f"You Said : {text}")
                            # Generate response using GPT
                            response = Bard().get_answer(text)['content']
                            if len(response) > 100:
                                sentences = response.split(".")
                                response = " ".join(sentences[:5]) + "..."
                            print(f"GPT Says : {response}")
                            # Record audio with gTTS for video
                            tts1 = gTTS(text=response, lang="id")
                            tts1.save("res.mp3")
                            # Read response using text-to-speech
                            if response != "" :
                                playsound("res.mp3")
                                             
                    
            except sr.UnknownValueError:
                print("Wait a moment")
            except sr.RequestError as e:
                print("Could not request results from speech recognition service; {0}".format(e))
            except Exception as e:
                print("An error occurred: {0}".format(e))            

           
if __name__ == "__main__":
    main()