export function calculateRate(totalStars, totalUsers) {
    let perfectStars = totalUsers * 5;
    let percetageStars = totalStars / perfectStars;

    let averageStars = percetageStars * 5;
    let roundAverage = Math.round(averageStars);
    return roundAverage;
}
