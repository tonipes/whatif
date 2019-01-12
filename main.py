#!/usr/bin/env python

import json
import random

data = json.load(open('data.json', 'r'))

def get(*item):
    choice = random.choice(item)
    unpacked = choice.split(":")
    modifiers = unpacked[1:]
    category = unpacked[0]

    word = random.choice(data["words"][category])

    final_word = word[0] + " " if "plural" not in modifiers and "noarticle" not in modifiers else ""
    final_word += word[2] if "plural" in modifiers else word[1]

    return final_word.strip()

def main():

    unpacked_sentences = []

    for sentence in data['sentences']:
        assert sentence[0].count("{}") == len(sentence[1]), "Option count do not match position count"
        unpacked_sentences.append([sentence[0], [i.split('|') for i in sentence[1]]])

    for sentence in unpacked_sentences:
        inputs = [get(*i) for i in sentence[1]]
        final = sentence[0].format(*inputs)
        final = final.capitalize()[0] + final[1:]
        print("What If ... " + final + "?")

if __name__== "__main__":
    main()