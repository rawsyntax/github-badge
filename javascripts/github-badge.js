/*
 * github-badge
 * version: 0.1
 * @requires jQuery 1.4.2 (written on jquery-1.4.2)
 * @requires Jaml
 *
 * Eric Himmelreich [ e@binarysoul.com ]
 *
 * Inspired by Dr Nic's http://github.com/drnic/github-badges
 * and
 * http://blog.darkhax.com/2010/03/04/make-your-own-badge-with-jquery-and-jaml
 *
 * I wrote this because drnic's version caused my internet explorers to crash
 *
 */

// default GITHUB_USER (me!)
if(typeof GITHUB_USER == 'undefined') {
  var GITHUB_USER = 'himmel';
}else{
  GITHUB_USER = GITHUB_USER.toLowerCase();
}

// default GITHUB_TITLE
if(typeof GITHUB_TITLE == 'undefined') {
  var GITHUB_TITLE = 'Open Source Projects';
}

// githubRepoFilter
// @param repo (github-repo json from http://github.com/api/v1/json/username )
//
// Determine which repos to include in the list (true) and which
// repos to exclude (false)
//
// @return boolean expression
//
if (typeof githubRepoFilter == 'undefined') {
  var githubRepoFilter = function(repo) { return !(repo["private"]); };
}

function GithubBadge(json) {
  if (json) {
    var badge = new Object();
    badge['username'] = json.user.login;
    badge['repos'] = json.user.repositories.filter(githubRepoFilter).sort(function() {
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
        span({ cls: 'title'}, GITHUB_TITLE),
        span('(<a href=\"http://github.com/'+
             GITHUB_USER + '\" target=\"_blank\">' + GITHUB_USER + '</a>)')
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

// load the repos
$.getScript('http://github.com/api/v1/json/'+
            GITHUB_USER +
            '?callback=GithubBadge');
