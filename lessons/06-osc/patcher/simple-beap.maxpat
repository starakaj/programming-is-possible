{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 1,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 79.0, 1612.0, 937.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-77",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Gain and Bias.maxpat",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 740.0, 479.0, 146.0, 116.0 ],
					"varname" : "bp.Gain and Bias",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-76",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Sequencer.maxpat",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 112.0, 28.0, 726.0, 232.0 ],
					"varname" : "bp.Sequencer",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-74",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 1182.0, 282.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[3]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-73",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Diode Ladder.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 112.0, 545.0, 250.0, 116.0 ],
					"varname" : "bp.Diode Ladder",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-71",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 849.0, 282.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-67",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 461.0, 282.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-66",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.AD2.maxpat",
					"numinlets" : 3,
					"numoutlets" : 3,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "signal" ],
					"patching_rect" : [ 461.0, 545.0, 220.0, 116.0 ],
					"varname" : "bp.AD2",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-62",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 112.0, 670.0, 113.0, 116.0 ],
					"varname" : "bp.VCA",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-60",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Scope.maxpat",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 112.0, 420.0, 101.0, 116.0 ],
					"varname" : "bp.Scope[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-41",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Scope.maxpat",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 263.5, 809.0, 101.0, 116.0 ],
					"varname" : "bp.Scope[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-37",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 112.0, 282.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-11",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Stereo.maxpat",
					"numinlets" : 2,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 112.0, 809.0, 148.0, 116.0 ],
					"varname" : "bp.Stereo[1]",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-60", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"source" : [ "obj-60", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 1 ],
					"order" : 0,
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"order" : 2,
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"order" : 1,
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 1 ],
					"source" : [ "obj-66", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"order" : 1,
					"source" : [ "obj-67", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-76", 0 ],
					"order" : 0,
					"source" : [ "obj-67", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-77", 0 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 1 ],
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-76", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 2 ],
					"source" : [ "obj-77", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-11::obj-52" : [ "Level[1]", "Level", 0 ],
			"obj-74::obj-4" : [ "Waveform[4]", "Waveform", 0 ],
			"obj-76::obj-130" : [ "mute[5]", "mute", 0 ],
			"obj-67::obj-36" : [ "PW[2]", "PW", 0 ],
			"obj-71::obj-107" : [ "Linear[3]", "Linear", 0 ],
			"obj-66::obj-119::obj-2" : [ "Linear/RC", "Linear/RC", 2 ],
			"obj-71::obj-129" : [ "CV2[3]", "CV2", 0 ],
			"obj-62::obj-80" : [ "Response", "Response", 0 ],
			"obj-67::obj-107" : [ "Linear[2]", "Linear", 0 ],
			"obj-67::obj-46" : [ "Offset[5]", "Offset", 0 ],
			"obj-66::obj-119::obj-13" : [ "scrollLeft", "scrollLeft", 12 ],
			"obj-76::obj-95" : [ "Steps", "Steps", 0 ],
			"obj-37::obj-107" : [ "Linear", "Linear", 0 ],
			"obj-67::obj-129" : [ "CV2[2]", "CV2", 0 ],
			"obj-76::obj-22" : [ "Pattern", "Pattern", 0 ],
			"obj-73::obj-55" : [ "power", "power", 0 ],
			"obj-73::obj-4" : [ "Offset[8]", "Offset", 0 ],
			"obj-77::obj-55" : [ "Bypass[1]", "Bypass", 0 ],
			"obj-66::obj-119::obj-19" : [ "DurationMultiplier", "DurMult", 7 ],
			"obj-74::obj-106" : [ "CV3[5]", "CV3", 0 ],
			"obj-11::obj-55" : [ "DSP[1]", "DSP", 0 ],
			"obj-37::obj-11" : [ "PWM", "PWM", 0 ],
			"obj-66::obj-119::obj-80" : [ "RetriggerMode", "Response", 4 ],
			"obj-66::obj-119::obj-32" : [ "Decay", "Decay", 1 ],
			"obj-37::obj-106" : [ "CV3", "CV3", 0 ],
			"obj-71::obj-45" : [ "FreqMode[3]", "FreqMode", 0 ],
			"obj-74::obj-11" : [ "PWM[4]", "PWM", 0 ],
			"obj-71::obj-11" : [ "PWM[3]", "PWM", 0 ],
			"obj-37::obj-51" : [ "Freq", "Freq", 0 ],
			"obj-67::obj-106" : [ "CV3[2]", "CV3", 0 ],
			"obj-74::obj-45" : [ "FreqMode[4]", "FreqMode", 0 ],
			"obj-76::obj-28" : [ "Sync", "Sync", 0 ],
			"obj-76::obj-157" : [ "Swing enable", "Swing enable", 0 ],
			"obj-11::obj-22" : [ "Mute[2]", "Mute", 0 ],
			"obj-66::obj-20" : [ "mute", "mute", 8 ],
			"obj-67::obj-51" : [ "Freq[2]", "Freq", 0 ],
			"obj-66::obj-119::obj-45" : [ "Attack", "Attack", 0 ],
			"obj-73::obj-28" : [ "Res", "Res", 0 ],
			"obj-76::obj-120" : [ "Max pulse[1]", "Max pulse", 0 ],
			"obj-67::obj-4" : [ "Waveform[2]", "Waveform", 0 ],
			"obj-77::obj-1" : [ "Bias", "Bias", 0 ],
			"obj-77::obj-10" : [ "Gain", "Gain", 0 ],
			"obj-66::obj-119::obj-46" : [ "RateOrTime", "RateOrTime", 10 ],
			"obj-73::obj-54" : [ "CV1", "CV1", 0 ],
			"obj-76::obj-185" : [ "Sequence", "Sequence", 0 ],
			"obj-71::obj-46" : [ "Offset[7]", "Offset", 0 ],
			"obj-71::obj-53" : [ "Mute[7]", "Mute", 0 ],
			"obj-74::obj-51" : [ "Freq[5]", "Freq", 0 ],
			"obj-77::obj-40" : [ "presets", "presets", 0 ],
			"obj-76::obj-25" : [ "GateTime", "GateTime", 0 ],
			"obj-37::obj-53" : [ "Mute", "Mute", 0 ],
			"obj-37::obj-46" : [ "Offset", "Offset", 0 ],
			"obj-71::obj-4" : [ "Waveform[3]", "Waveform", 0 ],
			"obj-74::obj-36" : [ "PW[4]", "PW", 0 ],
			"obj-66::obj-119::obj-44" : [ "EndOfStageMode", "EOS", 11 ],
			"obj-71::obj-106" : [ "CV3[3]", "CV3", 0 ],
			"obj-74::obj-129" : [ "CV2[5]", "CV2", 0 ],
			"obj-37::obj-4" : [ "Waveform", "Waveform", 0 ],
			"obj-66::obj-119::obj-42" : [ "scrollRight", "scrollRight", 13 ],
			"obj-74::obj-107" : [ "Linear[4]", "Linear", 0 ],
			"obj-67::obj-11" : [ "PWM[2]", "PWM", 0 ],
			"obj-11::obj-56" : [ "OutputChannel[1]", "OutputChannel", 0 ],
			"obj-37::obj-45" : [ "FreqMode", "FreqMode", 0 ],
			"obj-67::obj-45" : [ "FreqMode[2]", "FreqMode", 0 ],
			"obj-41::obj-20" : [ "RangeSwitch[1]", "RangeSwitch", 0 ],
			"obj-60::obj-20" : [ "RangeSwitch", "RangeSwitch", 0 ],
			"obj-67::obj-53" : [ "Mute[5]", "Mute", 0 ],
			"obj-73::obj-23" : [ "CV2[4]", "CV2", 0 ],
			"obj-73::obj-22" : [ "TimeMode", "TimeMode", 1 ],
			"obj-74::obj-46" : [ "Offset[9]", "Offset", 0 ],
			"obj-62::obj-55" : [ "Bypass", "Bypass", 0 ],
			"obj-71::obj-36" : [ "PW[3]", "PW", 0 ],
			"obj-74::obj-53" : [ "Mute[8]", "Mute", 0 ],
			"obj-62::obj-33" : [ "Quadrants", "Quadrants", 0 ],
			"obj-66::obj-119::obj-3" : [ "AttackCV", "AtkCV", 5 ],
			"obj-37::obj-36" : [ "PW", "PW", 0 ],
			"obj-66::obj-119::obj-129" : [ "RetriggerDuration", "RetrigDur", 9 ],
			"obj-76::obj-4" : [ "live.text", "live.text", 0 ],
			"obj-76::obj-89" : [ "Reset", "Reset", 0 ],
			"obj-37::obj-129" : [ "CV2", "CV2", 0 ],
			"obj-71::obj-51" : [ "Freq[3]", "Freq", 0 ],
			"obj-76::obj-155" : [ "Swing amount", "Swing amount", 0 ],
			"obj-66::obj-119::obj-5" : [ "DecayCV", "DcyCV", 6 ],
			"obj-73::obj-63" : [ "CV3[4]", "CV3", 0 ],
			"obj-76::obj-96" : [ "Pulse", "Pulse", 0 ],
			"obj-73::obj-20" : [ "Freq[4]", "Freq", 0 ],
			"obj-66::obj-119::obj-48" : [ "Loop", "Loop", 3 ],
			"obj-76::obj-125" : [ "NoteGrid", "NoteGrid", 0 ],
			"obj-76::obj-2" : [ "trans_trig", "trans_trig", 0 ],
			"parameterbanks" : 			{

			}
,
			"parameter_overrides" : 			{
				"obj-11::obj-52" : 				{
					"parameter_longname" : "Level[1]"
				}
,
				"obj-74::obj-4" : 				{
					"parameter_longname" : "Waveform[4]"
				}
,
				"obj-76::obj-130" : 				{
					"parameter_longname" : "mute[5]"
				}
,
				"obj-67::obj-36" : 				{
					"parameter_longname" : "PW[2]"
				}
,
				"obj-71::obj-107" : 				{
					"parameter_longname" : "Linear[3]"
				}
,
				"obj-71::obj-129" : 				{
					"parameter_longname" : "CV2[3]"
				}
,
				"obj-67::obj-107" : 				{
					"parameter_longname" : "Linear[2]"
				}
,
				"obj-67::obj-46" : 				{
					"parameter_longname" : "Offset[5]"
				}
,
				"obj-67::obj-129" : 				{
					"parameter_longname" : "CV2[2]"
				}
,
				"obj-73::obj-4" : 				{
					"parameter_longname" : "Offset[8]"
				}
,
				"obj-77::obj-55" : 				{
					"parameter_longname" : "Bypass[1]"
				}
,
				"obj-74::obj-106" : 				{
					"parameter_longname" : "CV3[5]"
				}
,
				"obj-11::obj-55" : 				{
					"parameter_longname" : "DSP[1]"
				}
,
				"obj-71::obj-45" : 				{
					"parameter_longname" : "FreqMode[3]"
				}
,
				"obj-74::obj-11" : 				{
					"parameter_longname" : "PWM[4]"
				}
,
				"obj-71::obj-11" : 				{
					"parameter_longname" : "PWM[3]"
				}
,
				"obj-67::obj-106" : 				{
					"parameter_longname" : "CV3[2]"
				}
,
				"obj-74::obj-45" : 				{
					"parameter_longname" : "FreqMode[4]"
				}
,
				"obj-11::obj-22" : 				{
					"parameter_longname" : "Mute[2]"
				}
,
				"obj-67::obj-51" : 				{
					"parameter_longname" : "Freq[2]"
				}
,
				"obj-67::obj-4" : 				{
					"parameter_longname" : "Waveform[2]"
				}
,
				"obj-71::obj-46" : 				{
					"parameter_longname" : "Offset[7]"
				}
,
				"obj-71::obj-53" : 				{
					"parameter_longname" : "Mute[7]"
				}
,
				"obj-74::obj-51" : 				{
					"parameter_longname" : "Freq[5]"
				}
,
				"obj-71::obj-4" : 				{
					"parameter_longname" : "Waveform[3]"
				}
,
				"obj-74::obj-36" : 				{
					"parameter_longname" : "PW[4]"
				}
,
				"obj-71::obj-106" : 				{
					"parameter_longname" : "CV3[3]"
				}
,
				"obj-74::obj-129" : 				{
					"parameter_longname" : "CV2[5]"
				}
,
				"obj-74::obj-107" : 				{
					"parameter_longname" : "Linear[4]"
				}
,
				"obj-67::obj-11" : 				{
					"parameter_longname" : "PWM[2]"
				}
,
				"obj-11::obj-56" : 				{
					"parameter_longname" : "OutputChannel[1]"
				}
,
				"obj-67::obj-45" : 				{
					"parameter_longname" : "FreqMode[2]"
				}
,
				"obj-41::obj-20" : 				{
					"parameter_longname" : "RangeSwitch[1]"
				}
,
				"obj-67::obj-53" : 				{
					"parameter_longname" : "Mute[5]"
				}
,
				"obj-73::obj-23" : 				{
					"parameter_longname" : "CV2[4]"
				}
,
				"obj-74::obj-46" : 				{
					"parameter_longname" : "Offset[9]"
				}
,
				"obj-71::obj-36" : 				{
					"parameter_longname" : "PW[3]"
				}
,
				"obj-74::obj-53" : 				{
					"parameter_longname" : "Mute[8]"
				}
,
				"obj-71::obj-51" : 				{
					"parameter_longname" : "Freq[3]"
				}
,
				"obj-73::obj-63" : 				{
					"parameter_longname" : "CV3[4]"
				}
,
				"obj-73::obj-20" : 				{
					"parameter_longname" : "Freq[4]"
				}

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "bp.Stereo.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Output",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Oscillator.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Oscillator",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "sine.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "updown.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "up.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "square.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Scope.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Scope",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.VCA.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Level",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.AD2.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Envelope",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.linearenv.svg",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "bp.rcenv.svg",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "bp.loop.svg",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "bp.pageleft.svg",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "bp.pageright.svg",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Diode Ladder.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Filter",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.diodeladder.poly.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "0df_diodeladder.gendsp",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "gDSP",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Sequencer.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Sequencer",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "swingCalc.js",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Gain and Bias.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Level",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
