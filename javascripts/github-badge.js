/*
 * github-badge
 * version: 0.1
 * @requires jQuery 1.4.2 (written on jquery-1.4.2)
 * @requires Jaml
 * @requires underscore
 *
 * Eric Himmelreich [ e@binarysoul.com ]
 *
 * Inspiried by Dr Nic's http://github.com/drnic/github-badges
 * and
 * http://blog.darkhax.com/2010/03/04/make-your-own-badge-with-jquery-and-jaml
 *
 * I wrote this because drnic's version caused my internet explorers to crash
 */
var repoFilter = function(repo) {
  return !(repo["private"]);
}

function GithubBadge(json) {
  if (json) {
    var badge = new Object();
    badge['username'] = json.user.login;
    badge['repos'] = json.user.repositories.filter(repoFilter).sort(function() {
      return (Math.round(Math.random()) - 0.5);
    }).slice(0, 12);
    $('#github-badge').html(Jaml.render('github-badge', badge));
    if (!$.browser.msie) { $('a.github').tooltip(); }
  }
}

Jaml.register('repo', function(repo) {
  li({ cls: 'public clickable'},
     img({ title: repo.description, alt: 'public', src: 'http://github.com/images/icons/public.png'}),
     a({ title: repo.description, cls: 'github', href: repo.url, target: '_blank' }, repo.name));
});

Jaml.register('github-badge', function(badge) {
  div({ cls: 'github-badge' },
    div({ cls: 'header' },
        span({ cls: 'title'}, "Open Source Projects"),
        span('(<a href=\"http://github.com/himmel\" target=\"_blank\">himmel</a>)')
       ),
      div({ cls: 'body'},
          div({cls: 'repos'},
              ul({id: 'repo_listing'},
                 Jaml.render('repo', badge.repos)))
    ),
      div({cls: 'footer'},
          a({ href: 'http://github.com/himmel/github-badge', target: '_blank'}, 'Github Badge'),
          '| Written By', a({href: 'http://github.com/drnic', target: '_blank'}, 'Dr Nic'),
          br(),
          'Improved by', a({href: 'http://github.com/himmel', target: '_blank'}, 'himmel')
         )
  );
});

