
document.addEventListener("DOMContentLoaded", () => {

    const draggableElement = document.querySelectorAll('.draggable');
    const droppableElement = document.querySelectorAll('.droppable');

    let score = 0;

    // Display the score
    const scoreDisplay = document.getElementById('score');

    // DRAG START EVENT
    draggableElement.forEach(element => {

        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.currentTarget.id);

            event.currentTarget.classList.add('dragging');
        });

        element.addEventListener('dragend', (event) => {
            event.currentTarget.classList.remove('dragging');
        });

    });

    // DROP ZONE EVENTS
    droppableElement.forEach(element => {

        // Allow dropping
        element.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        // DROP EVENT
        element.addEventListener('drop', (event) => {
            event.preventDefault();

            const draggedId = event.dataTransfer.getData('text');
            const draggedElement = document.getElementById(draggedId);

            if (!draggedElement || draggedElement.classList.contains('matched')) {
                return;
            }

            const draggedAnimal = draggedElement.dataset.animal;
            const droppedAnimal = element.dataset.animal;

            // Check if the answer is correct
            if (draggedAnimal === droppedAnimal) {

                // Add 5 points
                score += 5;

                // Update score display
                scoreDisplay.textContent = "Score: " + score;

                // Mark as matched
                draggedElement.classList.add('matched');
                element.classList.add('matched');

                // Move baby animal into drop zone
                element.appendChild(draggedElement);

                // Show correct answer
                element.classList.add('correct');

                alert("Correct Match! +5 Points!");

                // Check if all animals are matched
                if (score === 15) {
                    setTimeout(() => {
                        alert("Congratulations! You matched all the animals! Final Score: " + score);
                    }, 300);
                }

            } else {

                alert("Incorrect Match! Try Again!");

            }

        });

    });

});
