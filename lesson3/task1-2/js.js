/* str =
`<p>One: 'Hi Mary.' Two: 'Oh, hi.'<p>
<p>One: 'How are you doing?'</p>
<p>Two: 'I'm doing alright. How about you?'</p>
<p>One: 'Not too bad. The weather is great isn't it?'</p>
<p>Two: 'Yes. It's absolutely beautiful today.'</p>
<p>One: 'I wish it was like this more frequently.'</p>
<p>Two: 'Me too.'</p>
<p>One: 'So where are you going now?'</p>
<p>Two: 'I'm going to meet a friend of mine at the department store.'</p>
<p>One: 'Going to do a little shopping?' Two: 'Yeah, I have to buy some presents for my parents.'</p>
<p>One: 'What's the occasion?'</p>
<p>Two: 'It's their anniversary.'</p>
<p>One: 'That's great. Well, you better get going. You don't want to be late.'</p>
<p>Two: 'I'll see you next time.'</p>
<p>One: 'Sure. Bye.'</p>`
 b = str.replace(/'/g, '"'); // Задание 1
b = str.replace(/\B'|'\B/g, '"'); // Задание 2
document.getElementById('data').innerHTML = b */ // Моя версия

let block = document.getElementById('text-container');
document.getElementById('replace').addEventListener('click', () => {
block.textContent = block.textContent.replace(/\B'|'\B/g, '"');
});