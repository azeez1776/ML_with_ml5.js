let model;

let state = 'collection';

let targetLabel = 'C'

function setup() {
    createCanve(400, 400);

    let options = {
        input: ['x', 'y'],
        output: ['label'],
        task: 'classification',
        debug: 'true'
    }

    model = ml5.neuralNetwork(options)
    background(255);
}

function keyPressed() {
    if (key === 't') {
        state = "training";
        console.log('machine training');
        model.normalizeData();
        let options = {
            epochs: 200
        }
        model.train(options, whileTraining, finishedTraining);
    } else {
        targetLabel = key.toUpperCase()
    }
}

function whileTraining() {
    console.log(epochs);
}

function finishedTraining() {
    console.log('Finished Training');
    state = 'prediction'
}

function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY
    };

    if (state == 'collection') {

        let target = {
            label: targetLabel
        };
        model.addData(inputs, target);
        stroke(0);
        noFill();
        ellipse(mouseX, mouseY, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(targetLabel, mouseX, mouseY);
    } else if (state == 'prediction') {
        model.classify(inputs, gotResults);
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
    stroke(0);
    fill(0, 0, 255, 100);
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    let label = results[0].label;
    text(label, mouseX, mouseY);
}