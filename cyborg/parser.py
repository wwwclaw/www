# -*- coding: utf-8 -*-
"""
Created on Wed Dec 01 18:15:55 2010

@author: Charles Law
"""


LEVELSIZE = 32 #LEVEL PARAMETERS
BYTE = 1 #bytes in python
WORD = 2 #bytes in python

def string2decWord(string):
    #little endian
    return (ord(string[1]) << 8) + (ord(string[0]))


def string2decByte(string):
    return ord(string)


def readMapLayer(f):
    layerBytes = string2decWord(f.read(WORD))
    layerInfo = []
    bytesLeft = layerBytes
    
    while (bytesLeft > 0):
        #read object code
        objectCode = string2decByte(f.read(BYTE))
        if objectCode==255:
            #This is RLE encoding, add multiple copies
            numCopies = string2decByte(f.read(BYTE))
            objectCode = string2decByte(f.read(BYTE))
            for i in range(numCopies):
                layerInfo.append(objectCode)
            bytesLeft = bytesLeft - 3
        else:
            #add 1 copy
            layerInfo.append(objectCode)
            bytesLeft = bytesLeft - 1
    
    #convert to matrix
    objArray = []
    for i in range(LEVELSIZE):
        objArray.append( layerInfo[(i*LEVELSIZE):(i*LEVELSIZE+32)] )
    
    return layerBytes, objArray
    
def parseDataFile(f):
    
    #read header
    junk = f.read(4*BYTE)
    numLevels = string2decWord(f.read(WORD))
    
    for i in range(2):
        #i = 1
    
        #read level header
        currLevelBytes = string2decWord(f.read(WORD))
        currLevelNum = string2decWord(f.read(WORD))
        currLevelTimeLim = string2decWord(f.read(WORD))
        currLevelChips = string2decWord(f.read(WORD))
        print "Level:", currLevelNum
        print "Time:", currLevelTimeLim
        print "Chips:", currLevelChips
    
        levelLeft = currLevelBytes-6
        
        #read map detail
        #map detail header
        spare = f.read(WORD) #compressed/uncompressed
        levelLeft = levelLeft - WORD
        layerBytes, layerOne = readMapLayer(f)
        levelLeft = levelLeft - layerBytes - WORD #last 2 for map header fields
        print layerOne
        layerBytes, layerTwo = readMapLayer(f)
        levelLeft = levelLeft - layerBytes - WORD #last 2 for map header fields
        
        junk = f.read(levelLeft*BYTE)
    

if __name__ == '__main__':
    
    f = open('CHIPS.DAT', 'rb')
    parseDataFile(f)
    f.close()
    print "done"