from random import choice


def get_prompts(prompt_amount):
    experiences = [
        "A mystery, dilemma, or conflict",
        "an unexpected encounter",
        "a planned encounter",
    ]
    suites = ["activities", "items", "neighbors", "events"]
    options = {
        "activities": [
            "Write a letter",
            "bake bread/make jam, cook a special meal",
            "tend your garden",
            "knit something for a friend",
            "reapair the roof",
            "take a walk",
            "do some mending",
            "sweep the floor",
            "paint a mural on your wall",
            "go to the farmers market",
            "practice a musical instrument",
            "brewa potion, salve, or tincture",
            "hange a bundle of herbs to dry",
        ],
        "items": [
            "skeleton key",
            "beeswax candle",
            "singing tea kettle",
            "parcel with no return address",
            "hand-drawn map",
            "potted plant whose health reflects your own",
            "book of fairy tales",
            "oversized sweater, its pockets filled",
            "pinecone that never touches the ground",
            "hag stone",
            "clay jar sealed with wax",
            "feather the length of your arm",
            "flower crown",
        ],
        "neighbors": [
            "witch",
            "mushroom sprite",
            "antlered person",
            "badger in a tweed vest",
            "robed figure in a swirl of floating flowers",
            "ghost",
            "sentient hive of bees",
            "elemental",
            "snailrider",
            "voice issuing from a massive urn",
            "mouse with a sword",
            "three raccoons in a trench coat",
            "full portrait who travels through paintings",
        ],
        "events": [
            "solar eclipse",
            "county fair",
            "double rainbow",
            "case of mistaken identity",
            "root vegetables sproute amrs, legs, and mobilize",
            "discover a pocket dimension",
            "thunderstorm",
            "strange lights in the sky",
            "find something that's been lost/hidden for years",
            "a neighbor asks for your help",
            "cold snap",
            "heat wave",
            "everyone sings when trying to speak",
        ],
    }
    prompts = []
    for i in range(prompt_amount):
        experience = choice(experiences)
        suite = choice(suites)
        option = choice(options[suite])
        prompts.append(f"{experience} - {option}")
    return prompts
