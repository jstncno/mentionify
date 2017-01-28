import Mentionify from '../../lib/mentionify';

var mentionify = new Mentionify();
mentionify.run({elementId: 'twitter'});
mentionify.run({elementId: 'github', account:'github'});
mentionify.run({elementId: 'facebook', account:'facebook'});
mentionify.run({elementId: 'portfolium', account:'portfolium'});
mentionify.run({elementId: 'soundcloud', account:'soundcloud'});
mentionify.run({elementId: 'linkedin', account:'linkedin'});
mentionify.run({elementId: 'reddit', account:'reddit'});
mentionify.run({elementId: 'auto', account:'auto'});
mentionify.run({elementId: 'specified-class-name', account:'facebook', className:'some-class-name'})
mentionify.run({elementId: 'email'});
