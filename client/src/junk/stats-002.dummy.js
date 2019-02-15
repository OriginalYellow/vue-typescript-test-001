/* eslint-disable no-underscore-dangle */
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import * as U from '../util';

const dummyData = [{
  index: 1,
  name: 'STR',
  full_name: 'Strength',
  desc: ['Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.', 'A Strength check can model any attempt to lift, push, pull, or break something, to force your body through a space, or to otherwise apply brute force to a situation. The Athletics skill reflects aptitude in certain kinds of Strength checks.'],
  skills: [{
    url: 'http://www.dnd5eapi.co/api/skills/4',
    name: 'Athletics',
  }],
  url: 'http://www.dnd5eapi.co/api/ability-scores/1',
}, {
  index: 2,
  name: 'DEX',
  full_name: 'Dexterity',
  desc: ['Dexterity measures agility, reflexes, and balance.', 'A Dexterity check can model any attempt to move nimbly, quickly, or quietly, or to keep from falling on tricky footing. The Acrobatics, Sleight of Hand, and Stealth skills reflect aptitude in certain kinds of Dexterity checks.'],
  skills: [{
    url: 'http://www.dnd5eapi.co/api/skills/1',
    name: 'Acrobatics',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/16',
    name: 'Sleight of Hand',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/17',
    name: 'Stealth',
  }],
  url: 'http://www.dnd5eapi.co/api/ability-scores/2',
},
// {
//   index: 3,
//   name: 'CON',
//   full_name: 'Constitution',
//   desc: ['Constitution measures health, stamina, and vital force.', 'Constitution checks are uncommon, and no skills apply to Constitution checks, because the endurance this ability represents is largely passive rather than involving a specific effort on the part of a character or monster.'],
//   skills: [],
//   url: 'http://www.dnd5eapi.co/api/ability-scores/3',
// },
{
  index: 4,
  name: 'INT',
  full_name: 'Intelligence',
  desc: ['Intelligence measures mental acuity, accuracy of recall, and the ability to reason.', 'An Intelligence check comes into play when you need to draw on logic, education, memory, or deductive reasoning. The Arcana, History, Investigation, Nature, and Religion skills reflect aptitude in certain kinds of Intelligence checks.'],
  skills: [{
    url: 'http://www.dnd5eapi.co/api/skills/3',
    name: 'Arcana',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/6',
    name: 'History',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/9',
    name: 'Investigation',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/11',
    name: 'Nature',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/15',
    name: 'Religion',
  }],
  url: 'http://www.dnd5eapi.co/api/ability-scores/4',
}, {
  index: 5,
  name: 'WIS',
  full_name: 'Wisdom',
  desc: ['Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.', 'A Wisdom check might reflect an effort to read body language, understand someone’s feelings, notice things about the environment, or care for an injured person. The Animal Handling, Insight, Medicine, Perception, and Survival skills reflect aptitude in certain kinds of Wisdom checks.'],
  skills: [{
    url: 'http://www.dnd5eapi.co/api/skills/2',
    name: 'Animal Handling',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/7',
    name: 'Insight',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/10',
    name: 'Medicine',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/12',
    name: 'Perception',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/18',
    name: 'Survival',
  }],
  url: 'http://www.dnd5eapi.co/api/ability-scores/5',
}, {
  index: 6,
  name: 'CHA',
  full_name: 'Charisma',
  desc: ['Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality.', 'A Charisma check might arise when you try to influence or entertain others, when you try to make an impression or tell a convincing lie, or when you are navigating a tricky social situation. The Deception, Intimidation, Performance, and Persuasion skills reflect aptitude in certain kinds of Charisma checks.'],
  skills: [{
    url: 'http://www.dnd5eapi.co/api/skills/5',
    name: 'Deception',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/8',
    name: 'Intimidation',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/13',
    name: 'Performance',
  }, {
    url: 'http://www.dnd5eapi.co/api/skills/14',
    name: 'Persuasion',
  }],
  url: 'http://www.dnd5eapi.co/api/ability-scores/6',
}];

const objToArray = R.curry(
  (keys, obj) => R.map(
    R.prop(R.__, obj),
    keys,
  ),
);

const wrapInTag = tag => R.pipe(
  R.concat(`<${tag}>`),
  RA.concatRight(`</${tag}>`),
);

const transformSkills = R.pipe(
  R.map(
    R.pipe(
      R.prop('name'),
      wrapInTag('li'),
    ),
  ),
  RA.concatAll,
  wrapInTag('ul'),
);

const transformDesc = R.pipe(
  R.adjust(0, R.concat('<br>')),
  R.map(wrapInTag('p')),
  RA.concatAll,
);

const keys = ['name', 'full_name', 'desc', 'skills'];

const transformData = R.pipe(
  R.map(
    R.pipe(
      R.pick(keys),
      R.evolve({
        name: wrapInTag('h1'),
        full_name: wrapInTag('h3'),
        desc: transformDesc,
        skills: transformSkills,
      }),
      objToArray(keys),
      R.append('<p></p>'),
    ),
  ),
  R.flatten,
  RA.concatAll,
);

const transformedData = transformData(dummyData); // ?

export default transformedData;

// NOTES:
// - viewOr (RA) might be good for dealing with missing data
