import csv
import sys

if len(sys.argv) < 2:
    print "Syntax: python GenerateDataSet.py INPUT_FILE OUTPUT_FILE_LIST"
    exit(0)
INPUT_FILE = sys.argv[1]
#OUTPUT_FILE1 = sys.argv[2]

with open(INPUT_FILE, 'rb') as csvfile:
    filereader = csv.reader(csvfile)
    userid = 1
    for row in filereader:
        tag = row[0]
        codes = []
        #Assign number code for personality type
        # I - 1, E - 2
        # N - 1, S - 2
        # F - 1, T - 2
        # J - 1, P - 2
        if tag[0] == 'I':
            codes.append('1')
        else:
            codes.append('2')
        if tag[1] == 'N':
            codes.append('1')
        else:
            codes.append('2')
        if tag[2] == 'F':
            codes.append('1')
        else:
            codes.append('2')
        if tag[3] == 'I':
            codes.append('1')
        else:
            codes.append('2')
        row_txt = str(userid)+"\t"
        row_txt += '\t'.join((codes))
        for i in range(1,23):
            row_txt += '\t'+row[i]
        print row_txt
        userid = userid + 1
