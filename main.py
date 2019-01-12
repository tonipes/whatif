#!/usr/bin/env python

import json

data = json.load(open('data.json', 'r'))


def get(*item):
    return "Cow"

def main():

    unpacked_sentences = []

    for sentence in data['sentences']:
        assert sentence[0].count("{}") == len(sentence[1]), "Option count do not match position count"
        unpacked_sentences.append([sentence[0], [i.split('|') for i in sentence[1]]])

    for sentence in unpacked_sentences:
        inputs = [get(*i) for i in sentence[1]]
        final = sentence[0].format(*inputs)
        print("What If ... " + final)

if __name__== "__main__":
    main()