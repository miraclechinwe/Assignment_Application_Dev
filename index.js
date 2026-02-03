document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".grid-10x10 .cell");
    const cellArray = Array.from(cells);

    // Task 1: Assign 75 random values
    let assignedCount = 0;
    while (assignedCount < 75) {
        const randomIndex = Math.floor(Math.random() * 100);
        if (cellArray[randomIndex].textContent === "") {
            cellArray[randomIndex].textContent = Math.floor(Math.random() * 101);
            assignedCount++;
        }
    }

    /* Task 2 - IDW Interpolation */
    document.getElementById("interpolate").addEventListener("click", function () {
        cellArray.forEach((targetCell, targetIndex) => {
            if (targetCell.textContent === "") {
                const x0 = targetIndex % 10;
                const y0 = Math.floor(targetIndex / 10);

                let numerator = 0;
                let denominator = 0;

                cellArray.forEach((sourceCell, sourceIndex) => {
                    if (sourceCell.textContent !== "") {
                        const xi = sourceIndex % 10;
                        const yi = Math.floor(sourceIndex / 10);
                        const distance = Math.sqrt((x0 - xi) ** 2 + (y0 - yi) ** 2);

                        if (distance !== 0) {
                            const weight = 1 / (distance ** 2);
                            numerator += weight * Number(sourceCell.textContent);
                            denominator += weight;
                        }
                    }
                });

                if (denominator !== 0) {
                    targetCell.textContent = Math.round(numerator / denominator);
                }
            }
        });
    });

    /* Task 3 - Visualize */
    document.getElementById("visualize").addEventListener("click", function () {
        cellArray.forEach(cell => {
            if (cell.textContent !== "") {
                const value = Number(cell.textContent);
                const brightness = Math.floor((value / 100) * 255);
                cell.style.backgroundColor = `rgb(${brightness}, 0, 0)`;
            }
        });
    });
});