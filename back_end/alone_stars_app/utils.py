from random import choice, randint
import json


def get_planet_name():
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    planet_name = ""
    for i in range(3):
        planet_name += choice(alphabet)
    planet_name += str(randint(100, 999))
    return planet_name


def get_alone_prompts(prompt_amount):
    prompts = []
    hows = ["arduous", "suddenly", "resting"]
    whats = [
        "Living Beings: People like or unlike you, fish, dinosaurs, wolves, birds, giant insects, etc.",
        "Plants or other immobile forms of life:  Towering trees, carnivorous pitchers, giant ferns, glowing weeds, floating flowers, oozing mushrooms, etc.",
        "Ruins: Mysterious obelisks, vine-covered temples, abandoned dwellings for people bigger than you, a wrecked spaceship, etc.",
        "Natural phenomena: Huge crystal formations, mirages, vividly colored lightning, strange clouds, rocks eroded in strange shapes, veins of precious metals, etc.",
    ]
    locations = [
        "In a field taller than you.",
        "Under the light of the moons(s).",
        "By a gentle river",
        "In a steep canyon",
        "In a treetop",
        "On the snowy peak of a mountain",
        "Near a volcano",
        "On a glacier",
        "Deep underground",
        "On a cliff face",
        "In the desert",
        "In deep water",
        "Floating in the air",
    ]

    for i in range(prompt_amount):
        prompt = {}
        prompt["how"] = choice(hows)
        prompt["location"] = choice(locations)
        prompt["what"] = choice(whats)
        json_prompt = json.dumps(prompt)
        prompts.append(json_prompt)
    return prompts
