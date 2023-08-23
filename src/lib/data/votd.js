export const verses = [
    'JER.29.11',
    'HEB.12.2',
    'ROM.8.28',
    'JOH.3.16',
    'PHI.4.13',
    'PRO.3.5',
    'ROM.12.1',
    'PHI.5.6',
    'MAT.28.19',
    'EPH.2.8',
    'GAL.5.22',
    'JOH.10.10',
    'GAL.2.20',
    '1JOH.1.9',
    'ROM.3.23',
    'JOH.14.6',
    'ROM.3.23',
    'JOH.14.6',
    'ROM.5.8',
    'JOS.1.9',
    'ISA.40.31',
    'ROM.6.23',
    'ISA.53.4',
    '1PET.3.15',
    '2TIM.3.16',
    'MAT.6.33',
    '1PET.5.7',
    'EPH.2.10',
    '1COR.10.13',
    'MAT.11.28',
    'HEB.11.1'
]

export function getVOTD () {
    const date = new Date();
    const day = date.getDate();
    
    return verses[ day - 1 ];
}