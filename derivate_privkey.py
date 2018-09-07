#!/usr/bin/env python3

from __future__ import print_function
import sys

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

def inverse_mod( a, m ):
    """Inverse of a mod m."""
    if a < 0 or m <= a: a = a % m
    # From Ferguson and Schneier, roughly:
    c, d = a, m
    uc, vc, ud, vd = 1, 0, 0, 1
    while c != 0:
        q, c, d = divmod( d, c ) + ( c, )
        uc, vc, ud, vd = ud - q*uc, vd - q*vc, uc, vc

    # At this point, d is the GCD, and ud*a+vd*m = d.
    # If d == 1, this means that ud is a inverse.
    assert d == 1
    if ud > 0: return ud
    else: return ud + m


def derivate_privkey(p, r, s1, s2, hash1, hash2):
    z = hash1 - hash2
    s = s1 - s2
    r_inv = inverse_mod(r, p)
    s_inv = inverse_mod(s, p)
    k = (z * s_inv) % p
    d = (r_inv * (s1 * k - hash1)) % p
    return d, k

class Test:
    addr    = 0x6b477781b0e68031109f21887e6b5afeaaeb002b
    pubkey  = 0xa96c5530f604e0a359fea09254be691ade6c5de5fb351a66d961f84c0044e1cee3890476d47ca85ace1df513235ce825b409d49cd8ba1f305ca8d580aefb74c4
    privkey = 0x614f5e36cd55ddab0947d1723693fef5456e5bee24738ba90bd33c0c6e68e269
    random  = 0x4b7670ee80409a4acee8ff9351f17001534035ecb552e444e93ca6a4242c8afe

    p  = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
    r  = 0x69a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166
    s1 = 0x7724cedeb923f374bef4e05c97426a918123cc4fec7b07903839f12517e1b3c8
    s2 = 0x2bbd9c2a6285c2b43e728b17bda36a81653dd5f4612a2e0aefdb48043c5108de
    z1 = 0x350f3ee8007d817fbd7349c477507f923c4682b3e69bd1df5fbb93b39beb1e04
    z2 = 0x4f6a8370a435a27724bbc163419042d71b6dcbeb61c060cc6816cda93f57860c

if __name__ == '__main__':
    if len(sys.argv) != 7:
        eprint('usage: %s p r s1 s2 z1 z2' % sys.argv[0])
        eprint('[TEST] %s\\\n 0x%x\\\n 0x%x\\\n 0x%x\\\n 0x%x\\\n 0x%x\\\n 0x%x' % 
                (sys.argv[0], Test.p, Test.r, Test.s1, Test.s2, Test.z1, Test.z2))
        sys.exit(1)

    p  = int(sys.argv[1], 0)
    r  = int(sys.argv[2], 0)
    s1 = int(sys.argv[3], 0)
    s2 = int(sys.argv[4], 0)
    z1 = int(sys.argv[5], 0)
    z2 = int(sys.argv[6], 0)
    privkey, random = derivate_privkey(p, r, s1, s2, z1, z2)
    print('0x%x' % privkey)



