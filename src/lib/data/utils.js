export function getVerseReference( verseId ) {
    const oldString = verseId;

    const strCut = oldString.slice( 4 );

    const index = strCut.indexOf('.');

    const final = strCut.slice( index + 1 );

    return final;
}