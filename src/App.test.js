import * as hangul from "hangul-js";

function hig(str, ind, normalize = false) {
    const charGroup = str.split('').map(c => hangul.d(c));
    const ranks = new Array(charGroup.length).fill(0);

    ind.forEach(([start, end]) => {
        for (let i = start; i <= end; i++) {
            let gIdx = indexOfValue(charGroup, i)[1];
            if (gIdx !== undefined)
                ranks[gIdx]++;
        }
    });

    if (normalize) return ranks.map((rank, i) => rank / charGroup[i].length);
    return ranks;
}

function indexOfValue(arr, i) {
    let j = 0;
    while (i >= 0 && j >= 0 && j < arr.length) {
        if (arr[j].length > i) return [arr[j][i], j, i];
        else {
            i -= arr[j].length;
            j++;
        }
    }
    return [];
}

it('indexOfValue', () => {
    expect(indexOfValue([[1, 2, 3]], 0)).toEqual([1, 0, 0]);
    expect(indexOfValue([[1, 2, 3]], 1)).toEqual([2, 0, 1]);
    expect(indexOfValue([[1, 2, 3]], 2)).toEqual([3, 0, 2]);
    expect(indexOfValue([[1, 2, 3], [4, 5, 6]], 3)).toEqual([4, 1, 0]);
    expect(indexOfValue([[1, 2, 3], [4, 5, 6]], 4)).toEqual([5, 1, 1]);
    expect(indexOfValue([[1, 2, 3], [4, 5, 6]], 5)).toEqual([6, 1, 2]);
});

it('rank', () => {
    expect(hig('바하마', [[1, 4]])).toEqual([1, 2, 1]);
    expect(hig('바하마', [[1, 4]], true)).toEqual([0.5, 1, 0.5]);

    expect(hig('대한민국', [[0, 3], [8, 8], [10, 10]])).toEqual([2, 2, 0, 2]);
    expect(hig('대한민국', [[0, 3], [8, 8], [10, 10]], true)).toEqual([1, 2 / 3, 0, 2 / 3]);

    expect(hig('대한민국', [[0, 5], [7, 8], [10, 10]])).toEqual([2, 3, 2, 2]);
    expect(hig('대한민국', [[0, 5], [7, 8], [10, 10]], true)).toEqual([1, 1, 2 / 3, 2 / 3]);
});

