
let jsSkillsLenght = $('.skills__js').length; 
let jsSkillsActualLength = $('.skills__js .skills__input').filter(":checked").length;
let $scaleArrow = $('.level__scale-arrow-image');
let $scaleValue = $('.level__value');
let scaleArrowAngleCorrection = -32;
let scaleAngleMaxValue = 180;
let scaleSectorMaxValue = 999;
let scaleSectorAngle = scaleAngleMaxValue / jsSkillsLenght;
let scaleSectorValue = scaleSectorMaxValue / jsSkillsLenght;
let scaleCorrection = scaleSectorAngle / scaleSectorValue; 
    
$scaleArrow.css({
    '-webkit-transform-origin':'47px 29px',
    'transform-origin':'47px 29px'
});
$scaleValue.text('0');

function skillsTimerCalculation ($value) {
    let scaleArrowActive = ($value) * scaleCorrection + scaleArrowAngleCorrection;
            
    $scaleArrow.css({
        '-webkit-transform':'rotate('+ scaleArrowActive +'deg)',
        'transform':'rotate('+ scaleArrowActive +'deg)'}
    );    
    $scaleValue.text($value);
}

function skillScale($value) {
    let scalePrevValue = + $scaleValue.text();
    let scaleActiveValue = scaleSectorValue * $value;
    let scaleDeltaValue = scaleActiveValue - scalePrevValue;

    let timer = setInterval(() => {
        if (scaleDeltaValue > 0) {
            skillsTimerCalculation (scalePrevValue ++);

            if (scalePrevValue > scaleActiveValue) {
                clearInterval(timer);
            }
        } else {
            skillsTimerCalculation (scalePrevValue --);

            if (scalePrevValue < scaleActiveValue) {
                clearInterval(timer);
            }
        }
    }, 1);
}

skillScale(jsSkillsActualLength);

$('.skills__js .skills__label').on('click', (event) => {
    let $this = $(event.currentTarget);

    if ($this.prev('.skills__input').prop('checked')) {
        jsSkillsActualLength -= 1;
    } else {
        jsSkillsActualLength += 1;    
    }

    skillScale(jsSkillsActualLength);
});

