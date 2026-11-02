/**
 * Takes React children and assigns a name prop to those of specified types if they don't already have one.
 * @param {React.ReactNode} children
 * @param {string} name
 * @param {Array<React.ElementType>} types
 * @returns {React.ReactNode}
 */
export declare function withChoiceName(children: React.ReactNode, name: string, types: Array<React.ElementType>): React.ReactNode;
