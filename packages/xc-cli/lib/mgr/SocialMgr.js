const open = require('open');
const inquirer = require('inquirer');
const socialShareRules = require('./cliRules');
const fs = require('fs');
const path = require('path');
const socialText = require('./SocialText');
const Locales = require('../util/Locales');


class SocialMgr {

  static async share(args) {

    try {
      const shareUrl = await SocialMgr.getShareUrl({
        type: args.type,
        text: 'A revolutionary API framework with a Desktop App.',
        url: 'https://xgenecloud.com'
      });
      open(shareUrl, {wait: true});
    } catch (e) {
      console.error(`Error in xc ${args.type}`, e);
    }
  }

  static async shareSocial(args = {}) {

    try {

      const prompt = Locales.getPrompt();

      const answer = await inquirer
          .prompt([
            {
              name: 'media',
              type: 'list',
              message: prompt.message,
              choices: prompt.choices
            }
          ])

      switch (answer.media) {

        case 'Next time':
          break;

        case 'Please dont ask me':
          SocialMgr.setShareRules('dontPrompt', true);
          break;

        case '- - -':
          break;

        case 'Github - ⭐️ or 👀 repo':
          open('https://github.com/xgenecloud/xgenecloud', {wait: true});
          break;


        default:
          const text = SocialMgr.getShareText(answer.media);
          const url = SocialMgr._getShareContentSuffix(answer.media);
          const shareUrl = await SocialMgr.getShareUrl({
            type: answer.media,
            text: text,
            url: 'https://xgenecloud.com'
          });

          open(shareUrl, {wait: true});
          break;

      }


    } catch (e) {
      console.error(`Error in xc share`, e);
    }
  }

  static getShareUrl({type, url, text}) {

    url = encodeURIComponent(url)
    text = encodeURIComponent(text)

    console.log(__dirname, process.cwd());

    switch (type) {

      case 'Twitter':
        return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=xgenecloud`;
        break;

      case 'Facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${text}&summary=${text}&quote=${text}&hashtag=%23xgenecloud`;
        break;

      case 'Linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=${text}`;
        break;

      case 'Reddit':
        return `https://www.reddit.com/submit?url=${url}&title=${text}`;
        break;

      case 'WhatsApp':
        return `https://api.whatsapp.com/send?text=${text}%0D%0A${url}`;
        break;

      case 'Telegram':
        return `https://telegram.me//share/url?url=${url}&text=${text}`;
        break;

      case 'Renren':
        return `http://widget.renren.com/dialog/share?resourceUrl=${url}&srcUrl=${url}&title=${text}&description=${text}`;
        break;

      case 'Line':
        return `http://line.me/R/msg/text/?${text}%0D%0A${url}`;
        break;

      case 'Vk':
        return `http://vk.com/share.php?url=${url}&title=${text}&comment=${text}`;
        break;

      case '新浪微博':
        return `http://service.weibo.com/share/share.php?url=${url}&appkey=&title=${text}&pic=&ralateUid=`;
        break;

      case '豆瓣':
        return `http://www.douban.com/recommend/?url=${url}&title=${text}`;
        break;

      case 'Wykop':
        return `https://www.addtoany.com/add_to/wykop?linkurl=${url}&linkname=${text}`;
        break;

      case 'OKru':
        return `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${url}`
        break;


      case 'WeChat':
        return `https://www.addtoany.com/add_to/wechat?linkurl=${url}&linkname=${text}`;
        break;


    }
  }


  static setShareRules(key, value) {
    socialShareRules[key] = value;
    fs.writeFileSync(path.join(__dirname, 'cliRules.json'), JSON.stringify(socialShareRules));
  }


  static setCreatedApis(value) {
    if (socialShareRules.dontPrompt) return
    socialShareRules.createdApis = value;
    socialShareRules.prompt = value;
    fs.writeFileSync(path.join(__dirname, 'cliRules.json'), JSON.stringify(socialShareRules));
  }

  static async showPrompt() {
    try {
      if (socialShareRules.createdApis && socialShareRules.prompt && !socialShareRules.dontPrompt) {
        await SocialMgr.shareSocial()
        SocialMgr.setShareRules('prompt', false);
      }
    } catch (e) {
      /* ignore any error while showing social prompt*/
    }
  }


  static getShareText(socialMediaType) {
    return SocialMgr._getShareContentPrefix(socialMediaType) +
        SocialMgr._getShareContentMid(socialMediaType) +
        SocialMgr._getShareContentSuffix(socialMediaType)
  }

  static _getShareContentPrefix(socialMediaType) {
    return socialText.prefix[Math.floor(Math.random() * socialText.prefix.length)];
  }

  static _getShareContentMid(socialMediaType) {
    return socialText.mid[Math.floor(Math.random() * socialText.mid.length)];
  }

  static _getShareContentSuffix(socialMediaType) {
    return socialText.suffix[Math.floor(Math.random() * socialText.suffix.length)];
  }


}


module.exports = SocialMgr;