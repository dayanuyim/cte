#!/usr/bin/env python3

import binascii
import sha3
#import hashlib

# Convert a number to 32 bytes array.
def bytes32(i):
    return binascii.unhexlify('%064x' % i)

# Calculate the keccak256 hash of a 32 bytes array.
def keccak256(x):
    return sha3.keccak_256(x).hexdigest()

def gen_addr(pubkey):
    hash = keccak256(bytes.fromhex(pubkey))
    return '0x' + hash[24:]


if __name__ == '__main__':
    #print(keccak256(bytes32(0)))

    pub = 'a96c5530f604e0a359fea09254be691ade6c5de5fb351a66d961f84c0044e1cee3890476d47ca85ace1df513235ce825b409d49cd8ba1f305ca8d580aefb74c4'
    addr = keccak256(bytes.fromhex(pub))
    print(addr)

