# SeasonalMoments for BetterDiscord

[Русский](./README.ru.md)

## Preview

Add your GIF as `assets/effects.gif` and uncomment this line:

<!-- ![SeasonalMoments effects](assets/effects.gif) -->

SeasonalMoments adds seasonal effects to chats and calls. Autumn brings falling leaves based on the supplied SVG. Winter adds falling snow and a fixed, flat snowbank made of overlapping circles along the top of the message box. Spring brings flowers. Summer displays softly twinkling stars of different sizes near the top of the chat. Occasional rain can replace the seasonal effect; raindrops bounce off the message box and make flat splashes. Some rain sessions also include a gentle flash over one half of the chat.

On your birthday, the plugin shows sparkles and a private greeting card. The card exists only in your client; it does not send a message to Discord or to anyone else. When first enabled, the plugin asks for your birth day and month. The year is not needed, and you can change or clear the date in the settings. In non-leap years, February 29 is celebrated on February 28.

In December, a Christmas tree emoji appears above the left edge of the snowy message box. It also appears when you select Winter or New Year manually for a preview. On December 31 and January 1, the automatic mode adds fireworks and a private New Year card. The fireworks launch from different positions at staggered times. The snowbank stays at a fixed height.

In Auto mode, the plugin decides whether it will rain when it starts and at the beginning of each local day. Monthly rain chances are: January and February 0%, March 35%, April 55%, May 45%, June 20%, July 15%, August 20%, September 30%, October 38%, November 20%, and December 0%. Thunderstorms are considered separately after rain is selected.

BetterDiscord's plugin settings let you choose Auto, a season, rain, thunderstorm, New Year, or Off. The choice persists across restarts. You can also adjust particle density, blur, and particle interaction. When interaction is enabled, leaves, snow, and flowers sometimes settle on a visible username for a few seconds, with a 4% chance per visible username per check, capped at 10% overall. Particles appear behind messages and do not cover the message box. They keep their animation phase when switching between chats and disappear outside chats and calls. Animations are hidden when reduced motion is enabled.

The plugin follows Discord's language setting for its interface text. Russian and English are supported; other languages use English.

## Installation

Copy [SeasonalMoments.plugin.js](./SeasonalMoments.plugin.js) to `%appdata%\BetterDiscord\plugins`, then enable **SeasonalMoments** in BetterDiscord's plugin settings. 

Autumn SVG: Diemen Design / LibreICONS, MIT license — <https://github.com/DiemenDesign/LibreICONS>.

Christmas tree emoji: Twemoji, Copyright 2018 Twitter, Inc. and other contributors, CC BY 4.0 — <https://github.com/jdecked/twemoji>, <https://creativecommons.org/licenses/by/4.0/>.



