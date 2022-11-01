export const NEW_LINE = "\r\n"

export function parseDescription(text: string): string {
    return text.split(/\r?\n/).reduce((prev: string[], curr: string) => {
        if (!curr.includes('description=')) {
            return prev
        }
        prev.push(curr.replace('description=', ''))
        return prev
    }, []).join(NEW_LINE)
}

export function replaceDescription(oldText: string, newText: string): string {
    const split = oldText.split(/\r?\n/);

    const header = split.slice(0, split.findIndex((v) => v.includes('description=')))
    const footer = split.reverse().slice(0, split.findIndex((v) => v.includes('description='))).reverse()
    const newDesc = newText.split(/\r?\n/).map((v) => `description=${v}`);
    return [
        ...header,
        ...newDesc,
        ...footer
    ].join(NEW_LINE)
}