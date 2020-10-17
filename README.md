# Fight Me (on) VTT

Basic Artificial Intelligence module for Foundry VTT.

The goal of this package is enable monsters to act in their own self-interest, not
in the interest of game play. This will NOT improve the player experience, but should
create some laughs.

## Wee Bit O' Background
This package is a nights and weekend hobby effort.  I (buddha314) have over 25 years of building enterprise AI, and this is a fun way to think about Decision Theory.  The design and mathematical sophistication will grow along with the project.

## Design Strategy

We want to enable NPC decision making in accordance with the rules and spirit of
D&D 5E.  Not an academic model of Decision Theory, we often just roll a die.  All
inputs should reflect attributes a DD5E monster already possesses without creating
new metrics or capabilities. Additionally, most scores are prefixed with a 10 for structural consistency.

## Assessments

Let's structure the features so that smarter or more experienced creatures can make better decisions.

1. Name
1. Category (Threat, Vulnerability, etc)
1. Sophistication.  from -4,... unlocked according to creatures Intelligence, Wisdom or other.  Maybe we need a defining attribute?  Default will be 0.
1. Opponent Features: What things do I need to know about the enemy to do this calculation?
1. Calculation

## Feature Sophistication

For lack of other resources, we'll use [this guide](https://www.dmingwithcharisma.com/2011/10/dd-stats-in-simple-language/)

* -5 An amoeba could perceive this as a threat. "I am currently being eaten"
* -4
* -3
* -2
* -1
* 0 Pub brawl
* 1
* 2
* 3
* 4 Intuit non-obvious threats like spells they may have
* 5 Strategic mastery, ability to see 2-3 moves ahead

### Example Features
This will get the juices flowing.

* Are you in melee with me right now?
* Are you using ranged attacks against me right now?
* Your intimidation score
* Your initiative score
* Your AC
* Your level or Challenge rating

## Decision Strategy

1. Evaluate threat level of all opponents (can they hurt me?)
  1. distance
  1. Weapon damage potential
  1. Intimidation
  1. Level
1. Evaluate vulnerability of all opponents (can I hurt them?)
  1. Can my weapons pierce their armor?
  1. What is my best weapon against them?
1. Evaluate accessibility (can I get to them?)
1. Choose
1. Act

## Calculations
We'll use `s` as the general score.

### Proximity Threat
Needs to accommodate the following issues:
1. Can they get into melee range quickly?
1. Can they damage me from where they are?
