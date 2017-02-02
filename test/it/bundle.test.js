import Mentionify from '../../lib/mentionify';

var mentionify = new Mentionify();
mentionify.run({elementId: 'twitter'});
mentionify.run({elementId: 'github', site:'github'});
mentionify.run({elementId: 'facebook', site:'facebook'});
mentionify.run({elementId: 'portfolium', site:'portfolium'});
mentionify.run({elementId: 'soundcloud', site:'soundcloud'});
mentionify.run({elementId: 'linkedin', site:'linkedin'});
mentionify.run({elementId: 'reddit', site:'reddit'});
mentionify.run({elementId: 'auto', site:'auto'});
mentionify.run({elementId: 'specified-class-name', site:'facebook', className:'some-class-name'})
mentionify.run({elementId: 'email'});
