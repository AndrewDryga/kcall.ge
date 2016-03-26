(function() {
  $(function() {
    var $contact_form = $('.contact-form');
    var $contact_type = $contact_form.find('select[name=type]');
    var $contact_name = $contact_form.find('input[name=name]');
    var $contact_reach_at = $contact_form.find('input[name="reach_at"]');
    var $contact_comment = $contact_form.find('textarea[name=comment]');

    $('.btn-purchase').click(function(event) {
      $.scrollTo($contact_form, 500);
      $contact_type.val($(this).data('subscription-type') ? $(this).data('subscription-type') : 'info');

      event.preventDefault();
      return true;
    })

    $contact_form.submit(function(event) {
      var message_body = "\n Тип обращения: " + $contact_type.find(":selected").text() +
                         "\n Имя клиента: " + $contact_name.val() +
                         "\n Связаться при помощи: " + $contact_reach_at.val() +
                         "\n Комментарий: " + $contact_comment.val();

      console.log(message_body);

      $.ajax({
        type: "POST",
        url: "http://46.101.96.60:3000/send",
        data: JSON.stringify({
          "message_body": "На сайте новая заявка. \n" + message_body
        }),
        'contentType': 'application/json',
        'dataType': 'json'
      })
      .done(function() {
        alert("Благодарим за ваше обращение! Мы свяжемся с вами в кратчайшие сроки.");
      })
      .fail(function() {
        alert("Ошибки при отправке запроса. Попробуйте связаться с нами по телефону.");
      });

      event.preventDefault();
      return true;
    });
  });
})();


// curl -vv -s --user 'api:key-305a5da0d5df9f3aa15a2bf5a8777b31' \
//     https://api.mailgun.net/v3/sandboxdd6725b6662b4e70a9f282b27cbc881a.mailgun.org/messages \
//     -F from='Mailgun Sandbox <postmaster@sandboxdd6725b6662b4e70a9f282b27cbc881a.mailgun.org>' \
//     -F to='Andrew Dryga <andrew@dryga.com>' \
//     -F subject='Hello Andrew Dryga' \
//     -F text='Congratulations Andrew Dryga, you just sent an email with Mailgun!  You are truly awesome!'
