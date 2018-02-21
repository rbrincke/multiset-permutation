class ListNode<T> {

    public readonly value: T;
    public next: ListNode<T>;

    constructor(value: T) {
        this.value = value;
    }

}

/**
 * Multiset permutation iterator.
 * 
 * See "Loopless Generation of Multiset Permutations using a Constant Number
 * of Variables by Prefix Shifts.", Aaron Williams, 2009.
 */
class MultiSetPermutationIterator<T extends number | string> {

    private readonly nodes: ListNode<T>[];

    private head: ListNode<T>;
    private i: ListNode<T>;
    private afteri: ListNode<T>;

    private pristine: boolean = true;

    constructor(readonly input: T[]) {
        this.nodes = this.initializeNodes(input);

        this.head = this.nodes[0];

        if (input.length > 1) {
            this.i = this.nodes[this.nodes.length - 2];
        }

        this.afteri = this.nodes[this.nodes.length - 1];
    }

    /** 
     * Check if another permutation is available.
     * @returns true if another permutation is available, false otherwise
     */
    public hasNext(): boolean {
        return this.pristine || this.afteri.next !== undefined || this.afteri.value < this.head.value;
    }

    /**
     * Produces and returns the next permutation if available.
     * @returns the next permutation
     * @exception if no more permutations are available
     */
    public next(): T[] {
        if (!this.hasNext()) {
            throw 'No more permutations available.';
        }

        if (this.pristine) {
            return this.visit(this.head);
        }

        let beforek: ListNode<T>;
        if (this.afteri.next !== undefined && this.i.value >= this.afteri.next.value) {
            beforek = this.afteri;
        } else {
            beforek = this.i;
        }

        const k: ListNode<T> = beforek.next;
        beforek.next = k.next;
        k.next = this.head;

        if (k.value < this.head.value) {
            this.i = k;
        }

        this.afteri = this.i.next;
        this.head = k;

        return this.visit(this.head);
    }

    private visit(node: ListNode<T>): T[] {
        const values: T[] = new Array();

        values.push(node.value);

        while (node.next !== undefined) {
            node = node.next;
            values.push(node.value);
        }

        this.pristine = false;

        return values;
    }

    private initializeNodes(input: T[]): ListNode<T>[] {
        const listNodes = input.sort().reverse().map(e => new ListNode(e));

        for (let i = 0; i < listNodes.length - 1; i++) {
            listNodes[i].next = listNodes[i + 1];
        }

        return listNodes;
    }

}

export default MultiSetPermutationIterator;