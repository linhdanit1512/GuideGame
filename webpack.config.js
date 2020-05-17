const path = require('path');
require('./src/util/makePrincessGalleryCss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var adminPack = {
   entry: [
      './src/app.admin.js',
      'bootstrap/dist/css/bootstrap.min.css',
      'react-tagsinput/react-tagsinput.css',
      './src/css/feature.css',
      './src/css/logo.css',
      './src/css/item.css',
      './src/css/handbook.css',
      './src/css/hero.css',
      './src/css/normal.css',
      './src/css/princess-card.css'
   ],
   output: {
      filename: 'admin.bundle.js',
      path: path.resolve(__dirname, 'dist/build')
   },
   mode: 'development',
   resolve: {
      alias: {
         /**
          Sidebar
          */
         Sidebar: path.resolve(__dirname, 'src/component/sidebar/Sidebar.jsx'),
         SidebarItem: path.resolve(__dirname, 'src/component/sidebar/SidebarItem.jsx'),
         ControlSidebar: path.resolve(__dirname, 'src/component/sidebar/ControlSidebar.jsx'),

         /**
          Feature
          */
         Feature: path.resolve(__dirname, 'src/component/feature/Feature.jsx'),
         FeatureItem: path.resolve(__dirname, 'src/component/feature/FeatureItem.jsx'),


         /**
          Home page
          */

         Home: path.resolve(__dirname, 'src/component/Home.jsx'),
         Handbook: path.resolve(__dirname, 'src/component/handbook/Handbook.jsx'),
         Calculator: path.resolve(__dirname, 'src/component/calculator/Calculator.jsx'),
         Recommender: path.resolve(__dirname, 'src/component/recommend/Recommend.jsx'),
         Arena: path.resolve(__dirname, 'src/component/recommend/Arena.jsx'),

         /**
          Hero
          */
         SummonForm: path.resolve(__dirname, 'src/component/form/SummonForm.jsx'),
         AddHero: path.resolve(__dirname, 'src/component/hero/AddHero.jsx'),
         HeroDetail: path.resolve(__dirname, 'src/component/hero/HeroDetail.jsx'),
         HeroGallery: path.resolve(__dirname, 'src/component/hero/HeroGallery.jsx'),
         HeroListDB: path.resolve(__dirname, 'src/component/hero/HeroListDB.jsx'),
         HeroList: path.resolve(__dirname, 'src/component/hero/HeroList.jsx'),
         HeroItem: path.resolve(__dirname, 'src/component/hero/HeroItem.jsx'),
         princesses: path.resolve(__dirname, 'src/static-data/princesses.js'),
         HeroExtend: path.resolve(__dirname, 'src/component/hero/form-element/HeroExtend.jsx'),
         HeroSkill: path.resolve(__dirname, 'src/component/hero/form-element/HeroSkill.jsx'),


         /**
          General
          */
         BoxItem: path.resolve(__dirname, 'src/component/box/BoxItem.jsx'),
         DisplayText: path.resolve(__dirname, 'src/util/displayText.js'),
         SwitchLanguage: path.resolve(__dirname, 'src/component/setting/SwitchLanguage.jsx'),
         Logo: path.resolve(__dirname, 'src/component/box/Logo.jsx'),
         Template: path.resolve(__dirname, 'src/component/Template.jsx'),
         Keyword: path.resolve(__dirname, 'src/static-data/keywords.js'),

         /**
          Skill
          */
         SkillList: path.resolve(__dirname, 'src/component/skill/SkillList.jsx'),
         SkillItem: path.resolve(__dirname, 'src/component/skill/SkillItem.jsx'),
         SkillGallery: path.resolve(__dirname, 'src/component/skill/SkillGallery.jsx'),
         SkillHero: path.resolve(__dirname, 'src/component/skill/SkillHero.jsx'),
         SkillForm: path.resolve(__dirname, 'src/component/form/SkillForm.jsx'),

         /*
         Team
         */
         TeamBox: path.resolve(__dirname, 'src/component/team/TeamBox.jsx'),
         LegalBattle: path.resolve(__dirname, 'src/component/team/LegalBattle.jsx'),
         TeamBoxForm: path.resolve(__dirname, 'src/component/team/TeamBoxForm.jsx'),
         TeamBoxItem: path.resolve(__dirname, 'src/component/team/TeamBoxItem.jsx'),
         TeamFighter: path.resolve(__dirname, 'src/component/team/TeamFighter.jsx'),

         Main: path.resolve(__dirname, 'src/component/Main.jsx'),
         Post: path.resolve(__dirname, 'src/component/post/Post.jsx'),
         Forum: path.resolve(__dirname, 'src/component/forum/Forum.jsx'),
         Navigation: path.resolve(__dirname, 'src/component/Navigation.jsx'),
         MyProvider: path.resolve(__dirname, 'src/component/MyProvider.jsx'),
         MyContext: path.resolve(__dirname, 'src/component/MyContext.jsx'),

         /** Calculator */

         CalculatorLevel: path.resolve(__dirname, 'src/component/calculator/Level.jsx'),
         CalculatorRune: path.resolve(__dirname, 'src/component/calculator/Rune.jsx'),

         /** Handbook */
         HandbookMaterial: path.resolve(__dirname, 'src/component/handbook/Material.jsx'),
         HandbookEquipment: path.resolve(__dirname, 'src/component/handbook/Equipment.jsx'),
      }
   },
   module: {
      rules: [
         {
            loader: 'babel-loader',
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            options: {
               presets: ['@babel/preset-env', '@babel/preset-react']
            }
         },
         {
            use: ExtractTextPlugin.extract({
               use: 'css-loader',
               fallback: 'style-loader'
            }),
            test: /\.css$/

         }
      ]
   },
   plugins: [
      new ExtractTextPlugin('style.css')
   ]
}

module.exports = adminPack;