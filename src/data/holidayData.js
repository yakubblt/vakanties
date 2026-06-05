// Fallback-data: Als de app de JSON-file niet kan laden, wordt dit gebruikt
// Dit is een backup voor als internet niet werkt of bestand ontbreekt
const schoolDataByYear = {
    '2025-2026': {
        id: '94f2a45a-eefe-44a4-b4bb-33be9c260047',
        type: 'schoolvakanties',
        canonical:
            'https://www.rijksoverheid.nl/onderwerpen/schoolvakanties/overzicht-schoolvakanties-per-schooljaar/overzicht-schoolvakanties-2025-2026',
        content: [
            {
                title: 'Overzicht schoolvakanties schooljaar 2025-2026',
                schoolyear: '2025-2026',
                vacations: [
                    {
                        type: 'Herfstvakantie',
                        compulsorydates: 'false',
                        regions: [
                            {
                                region: 'noord',
                                startdate: '2025-10-18T00:00:00.000Z',
                                enddate: '2025-10-26T22:59:00.000Z',
                            },
                            {
                                region: 'midden',
                                startdate: '2025-10-18T00:00:00.000Z',
                                enddate: '2025-10-26T22:59:00.000Z',
                            },
                            {
                                region: 'zuid',
                                startdate: '2025-10-11T00:00:00.000Z',
                                enddate: '2025-10-19T21:59:00.000Z',
                            },
                        ],
                    },
                    {
                        type: 'Kerstvakantie',
                        compulsorydates: 'true',
                        regions: [
                            {
                                region: 'heel Nederland',
                                startdate: '2025-12-20T00:00:00.000Z',
                                enddate: '2026-01-04T22:59:00.000Z',
                            },
                        ],
                    },
                    {
                        type: 'Voorjaarsvakantie',
                        compulsorydates: 'false',
                        regions: [
                            {
                                region: 'noord',
                                startdate: '2026-02-21T00:00:00.000Z',
                                enddate: '2026-03-01T22:59:00.000Z',
                            },
                            {
                                region: 'midden',
                                startdate: '2026-02-14T00:00:00.000Z',
                                enddate: '2026-02-22T22:59:00.000Z',
                            },
                            {
                                region: 'zuid',
                                startdate: '2026-02-14T00:00:00.000Z',
                                enddate: '2026-02-22T22:59:00.000Z',
                            },
                        ],
                    },
                    {
                        type: 'Meivakantie',
                        compulsorydates: 'false',
                        regions: [
                            {
                                region: 'heel Nederland',
                                startdate: '2026-04-25T00:00:00.000Z',
                                enddate: '2026-05-03T21:59:00.000Z',
                            },
                        ],
                    },
                    {
                        type: 'Zomervakantie',
                        compulsorydates: 'true',
                        regions: [
                            {
                                region: 'noord',
                                startdate: '2026-07-04T00:00:00.000Z',
                                enddate: '2026-08-16T21:59:00.000Z',
                            },
                            {
                                region: 'midden',
                                startdate: '2026-07-18T00:00:00.000Z',
                                enddate: '2026-08-30T21:59:00.000Z',
                            },
                            {
                                region: 'zuid',
                                startdate: '2026-07-11T00:00:00.000Z',
                                enddate: '2026-08-23T21:59:00.000Z',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    '2024-2025': {
        id: '8b1c1df7-5c5d-4be7-bf3d-a2ba9e4cf9ef',
        type: 'schoolvakanties',
        canonical:
            'https://www.rijksoverheid.nl/onderwerpen/schoolvakanties/overzicht-schoolvakanties-per-schooljaar/overzicht-schoolvakanties-2024-2025',
        content: [
            {
                title: 'Overzicht schoolvakanties schooljaar 2024-2025',
                schoolyear: '2024-2025',
                vacations: [
                    {
                        type: 'Herfstvakantie',
                        compulsorydates: 'false',
                        regions: [
                            {
                                region: 'noord',
                                startdate: '2024-10-12T00:00:00.000Z',
                                enddate: '2024-10-20T22:59:00.000Z',
                            },
                            {
                                region: 'midden',
                                startdate: '2024-10-19T00:00:00.000Z',
                                enddate: '2024-10-27T22:59:00.000Z',
                            },
                            {
                                region: 'zuid',
                                startdate: '2024-10-26T00:00:00.000Z',
                                enddate: '2024-11-03T22:59:00.000Z',
                            },
                        ],
                    },
                    {
                        type: 'Kerstvakantie',
                        compulsorydates: 'true',
                        regions: [
                            {
                                region: 'heel Nederland',
                                startdate: '2024-12-23T00:00:00.000Z',
                                enddate: '2025-01-05T22:59:00.000Z',
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

// Functie: Haal vakantiedata op voor een bepaald schooljaar
// Als het jaar niet exists: fallback naar 2025-2026
export function getHolidayData(schoolyear) {
    return schoolDataByYear[schoolyear] || schoolDataByYear['2025-2026'];
}
