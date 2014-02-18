$(document).ready(function() {
    /**
     * [progress is the plugin ]
     */
    $.fn.extend({
        progress: function(options, args) {
            var updateValue = 0;
            var defaults = {
                val: 0
            };
            var opt = $.extend(defaults, options);

            /**
             * [_getCurrentValue retrives the DOM background value of the linear gradient]
             * @param  {[DOM Object]} el [the current progress bar for which we need to retrieve the gradient value]
             * @return {[number]}    [value of the current value]
             */
            var _getCurrentValue = function(el) {
                var bgcss = $(el).css('background-image');
                bgcss = bgcss.substring(bgcss.indexOf('linear-gradient') + 15);
                bgcss = parseInt(bgcss.substring(bgcss.lastIndexOf(' '), bgcss.length - 1), 10);
                return bgcss;
            };

            /**
             * [_updateProgress is a function to update the progress bar and the label]
             * @param  {[number]} oldVal [the value retrieved in function _getCurrentValue]
             * @param  {[number]} newVal [ist he button value that the user has pressed]
             * @param  {[DOM Object]} obj    [to which progress bar the value needs to be applied]
             * @return {[void]}
             */
            var _updateProgress = function(oldVal, newVal, obj) {
                var valToUpdate = 0;

                if ((oldVal === 0 && newVal > 0) || (oldVal > 0)) {
                    valToUpdate = oldVal + newVal;
                    if (valToUpdate >= 100) {
                        $(obj).css({
                            background: "-webkit-linear-gradient(left, red " + valToUpdate + "%, red " + valToUpdate + "%)"
                        }).css({
                            background: "-moz-linear-gradient(left, red " + valToUpdate + "%, red " + valToUpdate + "%)"
                        }).css({
                            background: "-o-linear-gradient(left, red " + valToUpdate + "%, red " + valToUpdate + "%)"
                        }).css({
                            background: "-ms-linear-gradient(left, red " + valToUpdate + "%, red " + valToUpdate + "%)"
                        }).css({
                            background: "linear-gradient(left, red " + valToUpdate + "%, red " + valToUpdate + "%)"
                        });
                    } else if (valToUpdate < 0) {
                        valToUpdate = 0;
                        $(obj).css({
                            background: "-webkit-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "-moz-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "-o-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "-ms-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                        });
                    } else {
                        $(obj).css({
                            background: "-webkit-linear-gradient(left, lightgreen " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "-moz-linear-gradient(left, lightgreen " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "-o-linear-gradient(left, lightgreen " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "-ms-linear-gradient(left, lightgreen " + valToUpdate + "%, white " + valToUpdate + "%)"
                        }).css({
                            background: "linear-gradient(left, lightgreen " + valToUpdate + "%, white " + valToUpdate + "%)"
                        });
                    }
                } else if (oldVal === 0 && newVal < 0) {
                    valToUpdate = 0;
                    $(obj).css({
                        background: "-webkit-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                    }).css({
                        background: "-moz-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                    }).css({
                        background: "-o-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                    }).css({
                        background: "-ms-linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                    }).css({
                        background: "linear-gradient(left, white " + valToUpdate + "%, white " + valToUpdate + "%)"
                    });
                }

                /**
                 * update the progress value in terms of percentage
                 */

                $(obj).text(valToUpdate + '%');


            };

            return this.each(function() {
                var el = this;
                var currentVal = _getCurrentValue(el);
                _updateProgress(currentVal, opt.val, el);
            });
        }
    });

    $('button').on('click', function(evt) {
        evt.preventDefault();
        /**
         * [el stores which progress bar to be operated]         *
         */
        var el = $('#progressBar option:selected');
        /**
         * Calls and intilize the progress widget[val description]
         * @type {[type]}
         */
        $('#' + el.val()).progress({
            val: $(this).data('id')
        });
    });
});