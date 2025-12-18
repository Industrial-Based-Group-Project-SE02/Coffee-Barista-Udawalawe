(async () => {
  try {
    const postRes = await fetch('http://localhost:3000/api/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'AutoTestNode', email: 'auto@node.test', message: 'Feedback from node test script', rating: 5 })
    });
    console.log('POST status', postRes.status);
    console.log(await postRes.text());

    const getRes = await fetch('http://localhost:3000/api/feedbacks');
    console.log('GET status', getRes.status);
    console.log(await getRes.text());
  } catch (e) {
    console.error('ERR', e.message || e);
  }
})();