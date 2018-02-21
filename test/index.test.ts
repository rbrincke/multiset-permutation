import MultisetPermutationIterator from '../lib/index';

it('should reproduce the test case from the Williams paper', () => {
    const input = [1, 1, 2, 2, 3];

    const expected = [
        [3, 2, 2, 1, 1],
        [1, 3, 2, 2, 1],
        [3, 1, 2, 2, 1],
        [2, 3, 1, 2, 1],
        [1, 2, 3, 2, 1],
        [2, 1, 3, 2, 1],
        [3, 2, 1, 2, 1],
        [1, 3, 2, 1, 2],
        [3, 1, 2, 1, 2],
        [1, 3, 1, 2, 2],
        [1, 1, 3, 2, 2],
        [3, 1, 1, 2, 2],
        [2, 3, 1, 1, 2],
        [1, 2, 3, 1, 2],
        [2, 1, 3, 1, 2],
        [1, 2, 1, 3, 2],
        [1, 1, 2, 3, 2],
        [2, 1, 1, 3, 2],
        [3, 2, 1, 1, 2],
        [2, 3, 2, 1, 1],
        [2, 2, 3, 1, 1],
        [1, 2, 2, 3, 1],
        [2, 1, 2, 3, 1],
        [2, 2, 1, 3, 1],
        [1, 2, 2, 1, 3],
        [2, 1, 2, 1, 3],
        [1, 2, 1, 2, 3],
        [1, 1, 2, 2, 3],
        [2, 1, 1, 2, 3],
        [2, 2, 1, 1, 3]];

    const mpi = new MultisetPermutationIterator(input);

    let k = 0;
    while (mpi.hasNext()) {
        const permutation = mpi.next();
            
        expect(permutation).toEqual(expected[k]);
        k++;
    }
        
    expect(k).toEqual(expected.length);
});

it('should handle a single element', () => {
    const input = [2];
    const mpi = new MultisetPermutationIterator(input);

    expect(mpi.hasNext()).toBeTruthy();
    expect(mpi.next()).toEqual(input);
    expect(mpi.hasNext()).toBeFalsy();
});

it('should handle strings', () => {
    const input = ['a', 'b'];

    const mpi = new MultisetPermutationIterator(input);

    expect(mpi.next()).toEqual(['b', 'a']);
    expect(mpi.next()).toEqual(['a', 'b']);
    expect(mpi.hasNext()).toBeFalsy();
});