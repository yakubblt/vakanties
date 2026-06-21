import apiData from './api-mobile.json';

const defaultSchoolYear = '2025-2026';

function cleanText(value) {
    return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value;
}

function cleanHolidayData(data) {
    return {
        ...data,
        notice: cleanText(data.notice),
        authorities: data.authorities?.map(cleanText) || [],
        creators: data.creators?.map(cleanText) || [],
        content: data.content?.map((contentItem) => ({
            ...contentItem,
            title: cleanText(contentItem.title),
            schoolyear: cleanText(contentItem.schoolyear),
            vacations: contentItem.vacations?.map((vacation) => ({
                ...vacation,
                type: cleanText(vacation.type),
                regions: vacation.regions?.map((regionItem) => ({
                    ...regionItem,
                    region: cleanText(regionItem.region),
                })) || [],
            })) || [],
        })) || [],
    };
}

const schoolDataByYear = apiData.reduce((years, item) => {
    const cleanedItem = cleanHolidayData(item);
    const schoolYear = cleanedItem.content?.[0]?.schoolyear;

    if (schoolYear) {
        years[schoolYear] = cleanedItem;
    }

    return years;
}, {});

export function getSchoolYears() {
    return Object.keys(schoolDataByYear).sort().reverse();
}

export function getHolidayData(schoolyear) {
    return schoolDataByYear[schoolyear] || schoolDataByYear[defaultSchoolYear];
}
