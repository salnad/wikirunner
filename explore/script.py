import networkx as nx
import os
import json

G = nx.read_gpickle('./graph-saves/new-save.gpickle')

f = open('loaded.txt', 'r')
fw = open('loaded.txt', 'a')
downloaded = []
for line in f.readlines():
    downloaded.append(line[:-1])

l = []
for x in os.listdir('json-data'):
    if x[-4:] == 'json' and './json-data/' + x not in downloaded:
        l += ['./json-data/'+ x]

for e in l:
    with open(e) as json_file:
        data = json.load(json_file)
        print(f'Opened {e}...')
        for item in data:
            for dest in data[item]:
                G.add_edge(item, dest)
            # print(f'Added edges for {item}')
        nx.write_gpickle(G, f"./graph-saves/new-save.gpickle")
        fw.write(e + '\n')
        print(f'Finished loading data from {e}')