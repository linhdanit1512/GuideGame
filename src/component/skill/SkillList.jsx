import React, { useContext, useState } from 'react';
import MyContext from 'MyContext';
import SkillItem from 'SkillItem';

export default function SkillList(props) {
   const context = useContext(MyContext);
   let skills = ['sk_acty_arrow', 'sk_acty_arrow_quick', 'sk_acty_blade_blood', 'sk_acty_blood_bleed', 'sk_acty_death_hit', 'sk_acty_fire_ball', 'sk_acty_fire_fist', 'sk_acty_ground_stab', 'sk_acty_heavy_hit', 'sk_acty_ice_arrow', 'sk_acty_ice_blade', 'sk_acty_ice_boom', 'sk_acty_laser_blue', 'sk_acty_laser_colour', 'sk_acty_laser_red', 'sk_acty_life_round', 'sk_acty_life_twine', 'sk_acty_light', 'sk_acty_light_arrow', 'sk_acty_poison_arrow', 'sk_acty_poison_boom', 'sk_acty_purple_boom', 'sk_acty_purple_confuse', 'sk_acty_purple_pillar', 'sk_acty_rock', 'sk_acty_rock_blue', 'sk_acty_white_ball', 'sk_acty_white_boom', 'sk_acty_white_pillar', 'sk_acty_wind_roll', 'sk_psty_absorb_energy', 'sk_psty_armor_down', 'sk_psty_armor_up', 'sk_psty_armor_up_attack', 'sk_psty_armor_up_defend', 'sk_psty_atta_down', 'sk_psty_atta_up', 'sk_psty_atta_up_attack', 'sk_psty_atta_up_defend', 'sk_psty_bleed', 'sk_psty_break_down', 'sk_psty_break_up', 'sk_psty_break_up_attack', 'sk_psty_break_up_defend', 'sk_psty_burn', 'sk_psty_control_immune_up', 'sk_psty_crit_down', 'sk_psty_crit_up', 'sk_psty_crit_up_attack', 'sk_psty_crit_up_defend', 'sk_psty_critdmg_down', 'sk_psty_critdmg_up', 'sk_psty_critdmg_up_attack', 'sk_psty_critdmg_up_defend', 'sk_psty_death_enemy', 'sk_psty_death_friend', 'sk_psty_dodge_down', 'sk_psty_dodge_up', 'sk_psty_dodge_up_attack', 'sk_psty_dodge_up_defend', 'sk_psty_heal', 'sk_psty_heal_super', 'sk_psty_hitrate_down', 'sk_psty_hp_up', 'sk_psty_ice', 'sk_psty_poison', 'sk_psty_reducedmg_up', 'sk_psty_silent', 'sk_psty_skilldmg_down', 'sk_psty_skilldmg_up', 'sk_psty_skilldmg_up_attack', 'sk_psty_skilldmg_up_defend', 'sk_psty_stand', 'sk_psty_stun', 'sk_psty_truedmg_down', 'sk_psty_truedmg_up', 'sk_square_1', 'sk_square_2'];
   function a() { };
   var action = props.action;
   if (action == undefined || typeof action !== 'function') action = a;
   const { selectedSkill, setSelectedSkill } = useState('');

   let hasType = [];
   let poisons = skills.filter((value) => { return value.includes('_poison') });
   let armors = skills.filter((value) => { return value.includes('_armor') });
   let attacks = skills.filter((value) => { return value.includes('_atta') });
   let crits = skills.filter((value) => { return value.includes('_crit_') });
   let critDmg = skills.filter((value) => { return value.includes('_critdmg') });
   let dodges = skills.filter((value) => { return value.includes('_dodge') });
   let skilldmgs = skills.filter((value) => { return value.includes('_skilldmg') });
   let healths = skills.filter((value)=> value.includes('_heal') || value.includes('_hp') || value.includes('_bleed') || value.includes('_life'));
   let controls = ['sk_psty_bleed', 'sk_psty_stun', 'sk_psty_burn', 'sk_acty_purple_confuse']

   hasType.push(...poisons);
   hasType.push(...armors);
   hasType.push(...attacks);
   hasType.push(...crits);
   hasType.push(...critDmg);
   hasType.push(...dodges);
   hasType.push(...skilldmgs);
   hasType.push(...healths);



   let other = skills.filter((value, index) => {
      return !hasType.includes(value);
   });

   let lang = context.state.lang;
   let displayText = context.state.displayText[lang].skill;

   return (
      <div className="skill-gallery">
         <fieldset>
            <legend>{displayText.attack}</legend>
            {attacks.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.armor}</legend>
            {armors.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.health}</legend>
            {healths.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.dodge}</legend>
            {dodges.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.poison}</legend>
            {poisons.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.crit}</legend>
            {crits.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.critDmg}</legend>
            {critDmg.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.skilldmg}</legend>
            {skilldmgs.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>

         <fieldset>
            <legend>{displayText.other}</legend>
            {other.map((value, index) => {
               return <SkillItem selected={selectedSkill} setSelected={setSelectedSkill} img={value} key={index} lang={lang} action={action}></SkillItem>
            })}
         </fieldset>
      </div>
   )

}