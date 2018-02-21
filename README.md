# Multiset permutation

Simple multiset permutation iterator that operates on numbers and strings.

## Install

```
npm install multiset-permutation
```

## Sample usage

```
const mpi = new MultisetPermutationIterator([1, 1, 2, 3]);

while (mpi.hasNext()) {
  const permutation = mpi.next();
}
```

## See

*"Loopless Generation of Multiset Permutations using a Constant Number of Variables by Prefix Shifts."*, Aaron Williams, 2009.
